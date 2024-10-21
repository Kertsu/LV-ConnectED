
//Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

//Icons
import { ImageUp, LoaderCircle, Plus } from "lucide-react";

//Hooks
import React from "react";
import { useUploadValidId } from "@/hooks/useUserData";
import { useState, useEffect, ChangeEvent, DragEvent } from "react";
import { useAuth } from "@/hooks/use-auth";

const UploadValidId = () => {
  const [error, setError] = useState<string | null>(null); // Add this line
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const { mutate: uploadValidId, isPending, isSuccess } = useUploadValidId(); // Add this line

  const auth = useAuth();
  const userData = auth?.data;

  const cloud_name = "dst8xk1fa"; // change this to your cloud name
  const upload_preset = "pwdckr9c";

  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  useEffect(() => {
    return () => {
      // Revoke the object URL to avoid memory leaks
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  function handleDraggedImage(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file));
    }
  }

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setImageURL(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    console.log("ln:61 UploadValidId.tsx - UploadImage called"); // Add this line for debugging
    if (!image) return ""; // Return empty if no image is selected

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", upload_preset);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Upload error", error);
      return ""; // Return empty string on error
    }
  }

  async function uploadImageHandler() {
    console.log("ln:83 UploadValidId.tsx - UploadImageHandler called");
    if (image) {
      try {
        const imageURL = await uploadImage(); // Upload image and get URL
        uploadValidId(imageURL, {
          onSuccess: () => {
            setOpen(false);
            toast({
              title: "Success",
              description: "Valid ID Uploaded",
              variant: "default",
            });
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Failed to upload Valid ID",
              variant: "destructive",
            });
          },
        });
        setError(null);
      } catch (error) {
        console.error("Error uploading image:", error); // Log for debugging
        setError("Failed to upload the image. Please try again.");
      }
    } else {
      setError("Please select an image before uploading.");
    }
  }

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Complete your Verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        Please provide nformation to verify your account. <br />
        Your organization does not have permission to create posts if not
        verified.
      </CardContent>
      <CardFooter>
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            // Reset Image
            if (!isOpen && imageURL) { 
              setImageURL(null);       
              setImage(null);          
              URL.revokeObjectURL(imageURL); 
            }
            setOpen(isOpen); 
          }}
        >
          <DialogTrigger>
            <Button>Upload Valid ID Image</Button>
          </DialogTrigger>
          <DialogContent className="overflow-y-auto no-scrollbar rounded-none md:rounded-md max-h-full md:max-h-[90%] w-full md:max-w-[50%]">
            <DialogHeader>
              <DialogTitle>Upload Valid Id</DialogTitle>
              <DialogDescription>
                To verify your account you need to upload a clear image of your
                valid ID with your name in it.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div
                className="rounded-lg flex flex-col justify-center items-center gap-4 border-2 hover:border-gray-400 border-dashed"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDraggedImage}
              >
                <Label
                  htmlFor="image"
                  className={cn(
                    "flex gap-2 justify-center items-center w-full h-full",
                    !image && "h-[21.5rem]"
                  )}
                >
                  <Input
                    type="file"
                    id="image"
                    placeholder="image"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                  {imageURL ? (
                    <div className="w-full h-auto">
                      <img
                        src={imageURL}
                        alt="image"
                        className="h-full w-full rounded-sm object-cover aspect-video"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-4 text-slate-500 text-center">
                      <ImageUp className="h-16 w-16" />
                      Drag or Select Image <br /> Accepted .png .jpeg .jpg
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                  )}
                </Label>
              </div>

              <div className="flex justify-end gap-2 items-center ">
                <Button
                  size={"lg"}
                  onClick={uploadImageHandler}
                  className="flex gap-1 items-center "
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <LoaderCircle className="animate-spin h-5 w-5 text-gray-600 " />{" "}
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Plus /> Upload
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default UploadValidId;
