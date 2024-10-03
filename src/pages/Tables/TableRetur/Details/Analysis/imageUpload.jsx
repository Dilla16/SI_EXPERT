import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Input, Textarea } from "@/components/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const ImageUploadDialog = ({ isDialogOpen, setDialogOpen, handleSaveImages }) => {
  const [images, setImages] = useState([{ image: null, caption: "" }]);

  const handleAddImage = () => {
    if (images.length < 3) {
      setImages([...images, { image: null, caption: "" }]);
    }
  };

  const handleImageChange = (index, image) => {
    const newImages = [...images];
    newImages[index].image = image;
    setImages(newImages);
  };

  const handleCaptionChange = (index, caption) => {
    const newImages = [...images];
    newImages[index].caption = caption;
    setImages(newImages);
  };

  const handleSaveClick = () => {
    handleSaveImages(images);
    setDialogOpen(false);
  };

  const handleCancelClick = () => {
    setImages([{ image: null, caption: "" }]);
    setDialogOpen(false);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Images</DialogTitle>
        </DialogHeader>
        {images.map((img, index) => (
          <div
            key={index}
            className="mb-4"
          >
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
            />
            <Textarea
              placeholder="Enter image caption"
              value={img.caption}
              onChange={(e) => handleCaptionChange(index, e.target.value)}
              className="mt-2"
            />
          </div>
        ))}
        {images.length < 3 && (
          <Button
            onClick={handleAddImage}
            variant="secondary"
            className="mb-4"
          >
            Add Another Image
          </Button>
        )}
        <DialogFooter>
          <Button onClick={handleSaveClick}>Save Images</Button>
          <Button
            onClick={handleCancelClick}
            variant="secondary"
            className="ml-4"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// PropTypes for ImageUploadDialog
ImageUploadDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  handleSaveImages: PropTypes.func.isRequired,
};

export default ImageUploadDialog;
