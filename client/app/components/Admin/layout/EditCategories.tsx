import {
  useGetLayoutByTypeQuery,
  useUpdateLayoutMutation,
} from "@/app/redux/features/layout/layoutApi";
import { styles } from "@/app/utils/styles";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import _ from "lodash";
import Loader from "../../Loader/Loader";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, isSuccess, error, refetch } =
    useGetLayoutByTypeQuery(
      {
        type: "categories",
      },
      { refetchOnMountOrArgChange: true }
    );

  const [
    editLayout,
    {
      isLoading: updateLayoutLoading,
      isSuccess: updateLayoutIsSuccess,
      error: updateLayoutError,
    },
  ] = useUpdateLayoutMutation();

  const [categories, setCategories] = useState<{ title: string }[]>([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setCategories(data.layout.categories);
    }
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage?.data.message || "Something went wrong!");
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (updateLayoutIsSuccess) {
      refetch();
      setEdit(false);
      toast.success("Categories Updated Successfully!");
    }
    if (updateLayoutError) {
      const errorMessage = updateLayoutError as any;
      toast.error(errorMessage?.data.message || "Something went wrong!");
    }
  }, [updateLayoutIsSuccess, updateLayoutError]);

  useEffect(() => {
    if (data) {
      setEdit(
        !_.isEqual(data.layout.categories, categories) && !isEmptyCategory()
      );
    }
  }, [categories]);

  const handleCategoryChange = (e: any, id: number) => {
    setCategories((prevCategories: any) =>
      prevCategories.map((category: any, index: number) =>
        index === id ? { ...category, title: e.target.value } : category
      )
    );
  };

  const isEmptyCategory = () => {
    return categories.some((category: any) => category.title.trim() === "");
  };

  const handleAddCategory = () => {
    if (isEmptyCategory()) {
      toast.error("Please fill all the fields!");
    } else {
      setCategories([...categories, { title: "" }]);
    }
  };

  const handleDeleteCategory = (id: number) => {
    if (id > 1) {
      setCategories((prevCategories: any) =>
        prevCategories.filter((category: any, index: number) => index !== id)
      );
    }
  };

  const handleEdit = () => {
    editLayout({ type: "categories", categories });
  };

  return (
    <>
      {updateLayoutLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1 className={`${styles.title} mb-4`}>All Categories</h1>
          <div className="space-y-4 pr-4 flex flex-col justify-center items-center">
            {categories.map((category: any, index: number) => (
              <div className="flex gap-1 w-full justify-center items-center" key={index}>
                <input
                  className={`${styles.input} !w-[50%]`}
                  value={category.title}
                  onChange={(e) => handleCategoryChange(e, index)}
                  placeholder="Add your category"
                />
                <AiOutlineDelete
                  size={18}
                  className="dark:text-white cursor-pointer hover:text-red-500 duration-100"
                  onClick={() => handleDeleteCategory(index)}
                />
              </div>
            ))}
            <p
              className="font-Poppins text-sm font-medium dark:text-white flex items-center !mt-8 rounded-md duration-150 w-[50%]  cursor-pointer pl-4 gap-1"
              onClick={handleAddCategory}
            >
              <AiOutlinePlusCircle size={20} /> Add New Category
            </p>
            <div className="w-[50%] flex justify-end">
              <button
                className={`${styles.button} !w-[150px] ${
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
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
