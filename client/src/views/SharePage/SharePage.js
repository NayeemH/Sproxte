import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTemplateShare } from "../../actions/Cart.action";
import { ReadyUpload } from "../../components/ReadyUpload";
import NewLayout from "../../components/Shared/NewLayout/NewLayout";
import { Spinner } from "react-bootstrap";

const SharePage = ({ product, getTemplateShare }) => {
  const { id } = useParams();
  useEffect(() => {
    getTemplateShare(id);
  }, []);
  return (
    <div>
      <NewLayout>
        <div
          className="d-flex justify-content-start align-items-center"
          style={{ minHeight: "100vh" }}
        >
          {!product.name ? (
            <Spinner variant="dark" animation="grow" />
          ) : (
            <ReadyUpload
              type="link"
              product={{ pngImageFront: product.image, ...product }}
            />
          )}
        </div>
      </NewLayout>
    </div>
  );
};
const mapStateToProps = (state) => ({
  product: state.landing.selected_template,
});
export default connect(mapStateToProps, { getTemplateShare })(SharePage);
