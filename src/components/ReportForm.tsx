import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Upload, Image as ImageIcon, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useReportService } from "../services/reportService";

interface FormData {
  description: string;
}

const ReportForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const reportService = useReportService();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsGettingLocation(false);
        toast.success("Location acquired successfully");
      },
      (error) => {
        setIsGettingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error("User denied the request for geolocation");
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Location information is unavailable");
            break;
          case error.TIMEOUT:
            toast.error("The request to get user location timed out");
            break;
          default:
            toast.error("An unknown error occurred");
            break;
        }
      },
      { enableHighAccuracy: true }
    );
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedImage) {
      toast.error("Please select an image");
      return;
    }

    if (!location) {
      toast.error("Please get your location first");
      return;
    }

    setIsSubmitting(true);

    // Create FormData object
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("description", data.description);
    formData.append("lat", location.lat.toString());
    formData.append("lng", location.lng.toString());

    try {
      await reportService.addReport(formData); // Pass FormData instead of individual values
      toast.success("Report submitted successfully!");

      // Reset form
      reset();
      setSelectedImage(null);
      setImagePreview(null);
      setLocation(null);
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-md p-6 animate-fade-in"
    >
      <div className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          {!imagePreview ? (
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-2 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="relative mt-1">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-64 w-full object-contain rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <button
            type="button"
            onClick={getLocation}
            disabled={isGettingLocation}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary-500 hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 disabled:opacity-70"
          >
            {isGettingLocation ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Getting location...
              </>
            ) : (
              <>
                <MapPin size={20} className="mr-2" />
                Get My Location
              </>
            )}
          </button>

          {location && (
            <div className="mt-2 text-sm text-gray-700">
              <p>Latitude: {location.lat.toFixed(6)}</p>
              <p>Longitude: {location.lng.toFixed(6)}</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
              errors.description
                ? "border-error-500 focus:border-error-500 focus:ring-error-500"
                : ""
            }`}
            placeholder="Provide details about the garbage (type, quantity, etc.)"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-error-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            <>
              <Upload size={20} className="mr-2" />
              Submit Report
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ReportForm;
