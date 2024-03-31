import { useGetLayoutByTypeQuery, useUpdateLayoutMutation } from "@/app/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/utils/styles";
import { CiCamera } from "react-icons/ci";
import toast from "react-hot-toast";

type Props = {};

const EditHero = (props: Props) => {
  const { data, isLoading, isSuccess, refetch } = useGetLayoutByTypeQuery({
    type: "banner",
  }, {refetchOnMountOrArgChange: true});
  const [editLayout, {isLoading: updateLayoutLoading, isSuccess: updateLayoutIsSuccess,  error: updateLayoutError}] = useUpdateLayoutMutation();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setTitle(data.layout.banner.title);
      setSubtitle(data.layout.banner.subtitle);
      setImage(data.layout.banner.image.url);
    }
  }, [data, isSuccess]);

  useEffect(()=>{
    if(updateLayoutIsSuccess){
        refetch();
        setEdit(false);
        toast.success("Hero Updated Successfully!");
    }
    if (updateLayoutError) {
        const errorMessage = updateLayoutError as any;
        toast.error(errorMessage?.data.message || "Something went wrong!");
      }
  }, [updateLayoutIsSuccess, updateLayoutError])

  useEffect(() => {
    if (
      data?.layout?.banner?.title !== title ||
      data?.layout?.banner?.subtitle !== subtitle ||
      data?.layout?.banner?.image?.url !== image
    ) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [title, subtitle, image]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (
          reader &&
          typeof reader.result === "string" &&
          reader.readyState === 2
        ) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = ()=>{
    editLayout({type: "banner", title, subtitle, image});
  }

  return (
    <>
    {updateLayoutLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full min-h-[80vh] flex flex-col 1000px:flex-row items-center bg-white dark:bg-slate-900 px-4 800px:px-12 gap-10 800px:gap-20 1000px:gap-0">
            <div className="relative w-[200px] h-[200px] 800px:h-[250px] 800px:w-[250px] 1000px:h-[400px] 1000px:w-[400px] flex justify-center items-center">
              <div className="hero_animation absolute w-full h-full rounded-full left-0 top-0"></div>
              <div className="w-[80%] h-[80%] relative flex justify-center items-center">
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleImageChange}
                />
                <img src={image} className="object-contain w-full h-full" alt="" />
              </div>
              <label
                  htmlFor="image"
                  className="absolute right-4 bottom-4 cursor-pointer"
                >
                  <CiCamera size={25} className="dark:text-white" />
                </label>
            </div>
            <div className="flex flex-col 1000px:gap-10 gap-8 w-full 1000px:w-[45%] ml-auto justify-center">
              <textarea
                className="text-2xl 800px:text-5xl font-Josefin dark:text-white font-semibold bg-transparent dark:bg-transparent outline-none resize-none no-scrollbar"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={4}
              />

              <textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="font-Josefin text-sm 800px:text-md dark:text-white font-semibold bg-transparent dark:bg-transparent outline-none resize-none no-scrollbar"
              />
            </div>
          </div>
          <div className="flex justify-end pr-12">
            <button
              className={`${styles.button} !w-[150px] ml-auto ${
                edit
                  ? "!bg-green-500"
                  : "!cursor-not-allowed !bg-slate-200 dark:!bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
              disabled={!edit}
              onClick={handleEdit}
            >
              Save
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default EditHero;
