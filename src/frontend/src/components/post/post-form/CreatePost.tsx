import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ImageUp, LoaderCircle, Plus } from "lucide-react";

import { ChangeEvent, DragEvent, ReactNode, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formats, modules } from "./quill-options";
import "./quill.css";
import { useCreatePost } from "@/hooks/usePostData";
import React from "react";
import { toast } from "@/hooks/use-toast";

interface CreatePostProps {
  children?: ReactNode; // Allow children to be passed as props
}

export default function CreatePost({ children }: CreatePostProps) {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { mutate: createPost, isPending } = useCreatePost();
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [open, setOpen] = React.useState(false);
  // Upload constants
  const cloud_name = "dst8xk1fa"; // change this to your cloud name
  const upload_preset = "pwdckr9c";

  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  useEffect(() => {
    return () => {
      // Revoke the object URL to avoid memory leaks
      if (thumbnailURL) {
        URL.revokeObjectURL(thumbnailURL);
      }
    };
  }, [thumbnailURL]);

  function handleDraggedThumbnail(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailURL(URL.createObjectURL(file));
    }
  }

  function handleThumbnail(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setThumbnail(file);
      setThumbnailURL(URL.createObjectURL(file));
    }
  }

  function handleTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value as string);
  }

  function handlePlatformType(value: string) {
    setType(value);
  }

  function handleContent(value: string) {
    setContent(value);
  }

  async function uploadThumbnail() {
    if (!thumbnail) return ""; // Return empty if no thumbnail is selected

    const formData = new FormData();
    formData.append("file", thumbnail);
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

  const resetErrors = () => {
    setErrors({});
  };

  async function createPostHandler() {
    // Validate form fields before proceeding
    const newErrors: { [key: string]: string | null } = {};
    if (!title) {
      console.log("Title is required");
      newErrors.title = "Title is required";
    }
    if (!type) {
      console.log("Platform type is required");
      newErrors.type = "Post type is required";
    }
    if (!content) {
      newErrors.content = "Content is required";
    }
    if (!thumbnail) {
      newErrors.thumbnail = "Thumbnail is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const thumbnailURL = await uploadThumbnail(); // Upload thumbnail and get URL
    createPost(
      {
        title,
        thumbnail: thumbnailURL,
        type,
        content,
      },
      {
        onSuccess: () => {
          setOpen(false);
          toast({
            title: "Success",
            description: "Post created",
            variant: "default",
          });
          resetErrors();
          setTitle("");
          setType("");
          setContent("");
          setThumbnail(null);
          setThumbnailURL(null);
        },
        onError: () => {
          setOpen(false);
          toast({
            title: "Error!",
            description: "Failed to create post!!",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && thumbnailURL) {
          // Reset thumbnail and URL
          setThumbnailURL(null);
          setThumbnail(null);
          URL.revokeObjectURL(thumbnailURL);
        }
        resetErrors();
        setOpen(isOpen);
      }}
    >
      <DialogTrigger>
        {children} {/* Render children here */}
      </DialogTrigger>
      <DialogContent className="overflow-y-auto no-scrollbar rounded-none md:rounded-md max-h-full md:max-h-[90%] w-full md:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Create new post</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div
            className="rounded-lg flex flex-col justify-center items-center gap-4 border-2 hover:border-gray-400 border-dashed"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDraggedThumbnail}
          >
            <Label
              htmlFor="thumbnail"
              className={cn(
                "flex gap-2 justify-center items-center w-full h-full",
                !thumbnail && "h-[21.5rem]"
              )}
            >
              <Input
                type="file"
                id="thumbnail"
                placeholder="Thumbnail"
                accept="image/*"
                onChange={handleThumbnail}
                className="hidden"
              />
              {thumbnailURL ? (
                <div className="w-full h-auto">
                  <img
                    src={thumbnailURL}
                    alt="thumbnail"
                    className="h-full w-full rounded-sm object-cover aspect-video"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-4 text-slate-500">
                  <ImageUp className="h-16 w-16" />
                  Upload Thumbnail
                  {errors.thumbnail && (
                    <p className="text-red-500">Image is required!</p>
                  )}
                </div>
              )}
            </Label>
          </div>

          <div className="flex items-center gap-4 justify-start">
            <Input
              placeholder="Title"
              onChange={handleTitle}
              value={title}
              className={`w-full border ${
                errors && errors.title ? "border-red-500" : ""
              }`}
              onFocus={resetErrors}
            />
            <Select onValueChange={handlePlatformType}>
              <SelectTrigger
                className={`w-full border ${
                  errors && errors.type ? "border-red-500" : ""
                }`}
                onFocus={resetErrors}
              >
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Scholarships</SelectLabel>
                  <SelectItem value="gov">Government Supported</SelectItem>
                  <SelectItem value="college/university">
                    College/University Scholarship
                  </SelectItem>
                  <SelectItem value="standalone">Standalone</SelectItem>
                  <SelectItem value="corporate/industry sponsored">
                    Corporate/Industry Sponsored
                  </SelectItem>
                  <SelectItem value="local government">
                    Local Government
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            {/* @ts-ignore */}
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleContent}
              modules={modules}
              formats={formats}
              placeholder=""
              className={`overflow-y-auto custom-ql border rounded-lg ${
                errors && errors.title ? "border-red-500" : ""
              }`}
              onFocus={resetErrors}
            />
          </div>

          <div className="flex justify-end gap-2 items-center">
            <Button
              variant={"default"}
              size={"lg"}
              onClick={createPostHandler}
              className="flex gap-1 items-center"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <LoaderCircle className="animate-spin h-5 w-5 text-gray-600 " />{" "}
                  Uploading...
                </>
              ) : (
                <>
                  <Plus /> Create Post
                </>
              )}{" "}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
