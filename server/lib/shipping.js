const fetch = require('node-fetch');


require('dotenv').config();

const {
    FEDEX_BASE_URL,
    FEDEX_CLIENT_ID,
    FEDEX_CLIENT_SECRET,
    FEDEX_ACCOUNT_NUMBER,
    FEDEX_WEIGHT_UNIT,
    FEDEX_PICKUP_TYPE,
    ADMIN_NAME,
    ADMIN_PHONE,
    ADMIN_EMAIL,
    ADMIN_COMPANY_NAME,
    ADMIN_STREET_LINE,
    ADMIN_CITY,
    ADMIN_STATE_OR_PROVINCE_CODE,
    ADMIN_POSTAL_CODE,
    ADMIN_COUNTRY_CODE,
} = process.env;

// URL 

const AuthURL = `${FEDEX_BASE_URL}/oauth/token`;
const AddressResolverURL = `${FEDEX_BASE_URL}/address/v1/addresses/resolve`;
const shippingRateURL = `${FEDEX_BASE_URL}/rate/v1/rates/quotes`;
const shippingLabelURL = `${FEDEX_BASE_URL}/ship/v1/shipments`;
const trackingInfoURL = `${FEDEX_BASE_URL}/track/v1/trackingnumbers`;

// Get access token from stripe
const authToken = async () => {
    const grant_type = 'client_credentials';

    const params = new URLSearchParams();
    params.append('grant_type', grant_type);
    params.append('client_id', FEDEX_CLIENT_ID);
    params.append('client_secret', FEDEX_CLIENT_SECRET);

    const response = await fetch(AuthURL, {method: 'POST', body: params});
    const data = await response.json();

    if(data.errors) throw Error(data.errors[0].message);

    return data;
};

// authToken().then(e => console.log);

// Address resolver
const addressResolver = async (address) => {
    // Get auth token
    const {access_token, token_type} = await authToken();
    
    // Data
    const body = {addressesToValidate: [{address}]}

    const response = await fetch(AddressResolverURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', authorization: token_type + ' ' + access_token},
        credentials: 'include', 
        body: JSON.stringify(body)
    });


    const data = await response.json();

    if(!data.output) throw Error(data.errors[0].message);

    const {
        streetLinesToken: streetLines,
        postalCode,
        city,
        stateOrProvinceCode,
        countryCode
    } = data.output.resolvedAddresses[0];
    
    return {
        streetLines,
        postalCode,
        city,
        stateOrProvinceCode,
        countryCode
    };
};

// const data = {
//     streetLines: [
//       "75063 PARKRIDGE "
//     ],
//     postalCode: 75068,
//     city: "IRVIN",
//     stateOrProvinceCode: "TX",
//     countryCode: "US"
// };
// console.log(data);
// addressResolver(data).then(data => console.log(data));

// Shipping Price
const shippingRate = async (shipperAddress, recipientAddress, serviceType, weight, date) => {
    // Get auth token
    const {access_token, token_type} = await authToken();
    
    // Data
    const body = {
        accountNumber: {
          value: FEDEX_ACCOUNT_NUMBER
        },
        requestedShipment: {
          shipper: {
            address: shipperAddress
          },
          recipient: {
            address: recipientAddress
          },
          serviceType,
          pickupType: FEDEX_PICKUP_TYPE,
          preferredCurrency: 'USD',
          rateRequestType: [
            "ACCOUNT"
          ],
          shipDateStamp: date,
          requestedPackageLineItems: [
            {
              weight: {
                units: FEDEX_WEIGHT_UNIT,
                value: weight
              }
            }
          ]
        }
      }

    const response = await fetch(shippingRateURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', authorization: token_type + ' ' + access_token},
        credentials: 'include', 
        body: JSON.stringify(body)
    });


    const data = await response.json();

    if(!data.output) throw Error(data.errors[0].message);

    const {totalNetFedExCharge: price, currency} = data.output.rateReplyDetails[0].ratedShipmentDetails[0];

    return {price, currency};
};

// shippingRate(
//     {
//         "postalCode": 65243,
//         "countryCode": "US"
//     },
//     {
//         "postalCode": 75063,
//         "countryCode": "US"
//     },
//     "FEDEX_GROUND",
//     50,
//     "2023-06-15"
// ).then(data => console.log(data));


const shippingLabel = async (contact, address, serviceType, packagingType, weight) => {
    // Get auth token
    const {access_token, token_type} = await authToken();
    
    // Data
    const body = {
        labelResponseOptions: "URL_ONLY",
        mergeLabelDocOption: "LABELS_ONLY",
        accountNumber: {
          value: FEDEX_ACCOUNT_NUMBER
        },
        requestedShipment: {
            shipper: {
                contact: {
                    personName: ADMIN_NAME,
                    phoneNumber: ADMIN_PHONE,
                    emailAddress: ADMIN_EMAIL,
                    companyName: ADMIN_COMPANY_NAME
                },
                address: {
                    streetLines: [
                        ADMIN_STREET_LINE
                    ],
                    city: ADMIN_CITY,
                    stateOrProvinceCode: ADMIN_STATE_OR_PROVINCE_CODE,
                    postalCode: ADMIN_POSTAL_CODE,
                    countryCode: ADMIN_COUNTRY_CODE
                }
            },
            recipients: [
                {contact, address}
            ],
            // shipDatestamp: "2022-05-26",
            serviceType,
            packagingType,
            pickupType: FEDEX_PICKUP_TYPE,
            blockInsightVisibility: false,
            shippingChargesPayment: {
                paymentType: "SENDER"
            },
            labelSpecification: {
                imageType: "PDF",
                labelStockType: "PAPER_85X11_TOP_HALF_LABEL"
            },
            requestedPackageLineItems: [
                {
                    weight: {
                        units: FEDEX_WEIGHT_UNIT,
                        value: weight
                    }
                }
            ]
        }
    }

    const response = await fetch(shippingLabelURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', authorization: token_type + ' ' + access_token},
        credentials: 'include', 
        body: JSON.stringify(body)
    });


    const data = await response.json();

    if(!data.output) throw Error(data.errors[0].message);

    const {masterTrackingNumber, packageDocuments} = data.output.transactionShipments[0].pieceResponses[0];


    return {masterTrackingNumber, labelURL: packageDocuments[0].url};
}

// shippingLabel(
//     {
//         personName: "Mr. Karim",
//         emailAddress: 'istiyak.riyad@gmail.com',
//         phoneNumber: 1234567890
//     },
//     {
//         streetLines: [
//             "RECIPIENT STREET LINE 1"
//         ],
//         city: "Collierville",
//         stateOrProvinceCode: "TN",
//         postalCode: 38017,
//         countryCode: "US"
//     },
//     "FEDEX_GROUND",
//     "YOUR_PACKAGING",
//     30
// ).then(data => console.log(data));


const trackingInfo = async (trackingNumber) => {
    // Get auth token
    const {access_token, token_type} = await authToken();
    
    // Data
    const body = {
        trackingInfo: [
            {
                trackingNumberInfo: {
                    trackingNumber
                }
            }
        ],
        includeDetailedScans: true
    }

    const response = await fetch(trackingInfoURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', authorization: token_type + ' ' + access_token},
        credentials: 'include', 
        body: JSON.stringify(body)
    });


    const data = await response.json();

    if(!data.output) throw Error(data.errors[0].message);
    const trackResults = data.output.completeTrackResults[0].trackResults[0];

    if(trackResults.error) throw Error(trackResults.error.message);
    
    return trackResults.scanEvents;
}

// trackingInfo('122816215025810')
// .then(data => console.log(data));


module.exports = {addressResolver, shippingRate, shippingLabel, trackingInfo};