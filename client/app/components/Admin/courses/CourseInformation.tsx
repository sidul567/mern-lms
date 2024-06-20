import { useGetLayoutByTypeQuery } from "@/app/redux/features/layout/layoutApi";
import { styles } from "@/app/utils/styles";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}: Props) => {
  const { data, isLoading, isSuccess, error, refetch } =
    useGetLayoutByTypeQuery(
      {
        type: "categories",
      },
      { refetchOnMountOrArgChange: true }
    );

  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setCategories(data.layout.categories);
    }
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage?.data.message || "Something went wrong!");
    }
  }, [data, isSuccess, error]);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!courseInfo.thumbnail) {
      toast.error("Please insert a thumbnail!");
    } else {
      setActive(active + 1);
    }
  };

  return (
    <div className="w-[95%] 800px:w-[80%]">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={`${styles.label}`}>
            Course Name{" "}
            <span className="text-red-500 text-lg font-medium">*</span>{" "}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`${styles.input}`}
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="description" className={`${styles.label}`}>
            Course Description{" "}
            <span className="text-red-500 text-lg font-medium">*</span>{" "}
          </label>
          <textarea
            name="description"
            id="description"
            className={`${styles.input}`}
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            rows={6}
            required
          />
        </div>
        <div className="flex justify-between gap-10">
          <div className="w-full">
            <label htmlFor="price" className={`${styles.label}`}>
              Course Price{" "}
              <span className="text-red-500 text-lg font-medium">*</span>{" "}
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className={`${styles.input}`}
              value={courseInfo.price}
              placeholder="29"
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="estimatedPrice" className={`${styles.label}`}>
              Estimated Price (Optional){" "}
              <span className="text-red-500 text-lg font-medium"></span>{" "}
            </label>
            <input
              type="number"
              name="estimatedPrice"
              id="estimatedPrice"
              placeholder="79"
              className={`${styles.input}`}
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex justify-between gap-10">
          <div className="w-full">
            <label htmlFor="tags" className={`${styles.label}`}>
              Course Tags{" "}
              <span className="text-red-500 text-lg font-medium">*</span>{" "}
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              className={`${styles.input}`}
              value={courseInfo.tags}
              placeholder="MERN, React, Redux"
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="tags" className={`${styles.label}`}>
              Select Category{" "}
              <span className="text-red-500 text-lg font-medium">*</span>{" "}
            </label>
            <select
              name=""
              id=""
              className={`${styles.input}`}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, category: e.target.value })
              }
            >
              <option value="" selected disabled>
                Select Category
              </option>
              {categories &&
                categories.map((category: any, index:number) => (
                  <option value={category.title} key={index}>{category.title}</option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between gap-10">
          <div className="w-full">
            <label htmlFor="level" className={`${styles.label}`}>
              Course Level{" "}
              <span className="text-red-500 text-lg font-medium">*</span>{" "}
            </label>
            <input
              type="text"
              name="level"
              id="level"
              className={`${styles.input}`}
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              placeholder="Beginner"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="price" className={`${styles.label}`}>
              Demo URL{" "}
              <span className="text-red-500 text-lg font-medium">*</span>{" "}
            </label>
            <input
              type="text"
              name="demoUrl"
              id="demoUrl"
              placeholder="7aabcderqannacsa"
              className={`${styles.input}`}
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div className="w-full">
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            className="hidden"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg, image/webp"
          />
          <label
            htmlFor="thumbnail"
            className={`w-full p-8 ${
              dragging
                ? "border-2 border-orange-500 dark:border-orange-400"
                : "border border-gray-400 dark:border-slate-600"
            } flex items-center justify-center rounded-md mt-8 cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="w-full h-[50%] object-contain"
              />
            ) : (
              <p className="dark:text-white text-sm font-medium">
                Drag & Drop your thumbnail here or click for browse
              </p>
            )}
          </label>
        </div>
        <div className="w-[30%] my-8 ml-auto">
          <input type="submit" value="Next" className={`${styles.button}`} />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
