const PostCardForm = ({ formData, handleFormDataChange }) => {
  return (
    <div style={{ backgroundColor: "#f4f6fb", height: "calc(100vh - 45px)" }}>
      <input
        type="color"
        value={formData.backgroundColor}
        onChange={(e) =>
          handleFormDataChange("backgroundColor", e.target.value)
        }
      />
    </div>
  );
};

export default PostCardForm;
