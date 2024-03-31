import { styles } from "@/app/utils/styles";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";
import toast from "react-hot-toast";
import { cloneDeep } from "lodash";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCouseContentData: (courseContentData: any) => void;
  handleSubmit: () => void;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCouseContentData,
  handleSubmit
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const handleToggle = (index: number) => {
    const updateCollapsed = [...isCollapsed];
    updateCollapsed[index] = !updateCollapsed[index];
    setIsCollapsed(updateCollapsed);
  };

  const handleDeleteSection = (index: number) => {
    if (index > 0) {
      const updatedCourseContent = [...courseContentData];
      updatedCourseContent.splice(index, 1);
      setCouseContentData(updatedCourseContent);
    }
  };

  const handleUpdateCourseContent = (e: any, index: number, property: string)=>{
    const updatedCourseContent = cloneDeep(courseContentData);
    updatedCourseContent[index][property] = e.target.value;
    setCouseContentData(updatedCourseContent);
  }

  const handleUpdateLink = (e: any, linkindex: number, index: number, property: string) => {
    const updatedCourseContent = cloneDeep(courseContentData);
    updatedCourseContent[index].links[linkindex][property] = e.target.value;
    setCouseContentData(updatedCourseContent);
  };

  const handleDeleteLink = (linkindex: number, index: number) => {
    if (linkindex > 0) {
      const updatedCourseContent = cloneDeep(courseContentData);
      updatedCourseContent[index].links.splice(linkindex, 1);
      setCouseContentData(updatedCourseContent);
    }
  };

  const handleAddLink = (index: number) => {
    const updatedCourseContent = cloneDeep(courseContentData);
    updatedCourseContent[index].links.push({ title: "", url: "" });
    setCouseContentData(updatedCourseContent);
  };

  const handleAddContent = (course: any) => {
    if (
      course.title === "" ||
      course.description === "" ||
      course.videoUrl === "" ||
      course.links[0].title === "" ||
      course.links[0].url === ""
    ) {
      toast.error("Please fill all of the fields!");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newVideoContent = {
        title: "",
        description: "",
        links: [{ title: "", url: "" }],
        videoUrl: "",
        videoLength: "",
        videoSection: newVideoSection,
        suggestion: "",
      };
      setCouseContentData([...courseContentData, newVideoContent]);
    }
  };

  const handleAddSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all of the fields!");
    } else {
      const newVideoContent = {
        title: "",
        description: "",
        links: [{ title: "", url: "" }],
        videoUrl: "",
        videoLength: "",
        videoSection:
          "Untitled Section - " + parseInt(courseContentData.length + 1),
        suggestion: "",
      };
      setCouseContentData([...courseContentData, newVideoContent]);
    }
  };

  const handleNext = ()=>{
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all of the fields!");
    } else {
      setActive(active+1);
      handleSubmit();
    }
  }

  return (
    <div className="w-[95%] 800px:w-[80%]">
      <form className="w-full">
        <div className="">
          {courseContentData.map((courseContent: any, index: number) => {
            const showSection =
              index === 0 ||
              courseContent.videoSection !==
                courseContentData[index - 1].videoSection;
            return (
              <div
                className={`dark:bg-slate-900 bg-gray-50 shadow-sm rounded-md px-2 800px:px-10 ${
                  showSection ? "mt-4 pt-4" : "pt-0.5"
                }`}
              >
                {showSection && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      name={`videoSection-${index}`}
                      id={`videoSection-${index}`}
                      value={courseContent.videoSection}
                      onChange={(e) => handleUpdateCourseContent(e, index, "videoSection")}
                      className={`${styles.input} border-none w-[230px!important] text-xl dark:bg-slate-900 bg-gray-50`}
                    />
                    <label htmlFor={`videoSection-${index}`}>
                      <BsFillPencilFill
                        size={16}
                        className="dark:text-white cursor-pointer"
                      />
                    </label>
                  </div>
                )}
                <div className="w-full flex justify-between px-2 mt-2">
                  <p
                    className={`font-Poppins text-sm font-medium dark:text-white ${
                      isCollapsed[index] ? "fade-in active" : "fade-in"
                    } ${!showSection && "pb-6"}`}
                  >
                    {index + 1}. {courseContent.title}
                  </p>
                  <div className="flex gap-1 dark:text-white ml-auto">
                    <AiOutlineDelete
                      size={20}
                      className="cursor-pointer"
                      onClick={() => handleDeleteSection(index)}
                    />
                    <MdKeyboardArrowDown
                      size={25}
                      className={`cursor-pointer ${
                        isCollapsed[index] ? "rotate-0" : "rotate-180"
                      } duration-300`}
                      onClick={() => handleToggle(index)}
                    />
                  </div>
                </div>
                <div
                  className={`${
                    !isCollapsed[index] ? "fade-in active" : "fade-in"
                  }`}
                >
                  {!isCollapsed[index] && (
                    <>
                      <div>
                        <label
                          htmlFor="videoTitle"
                          className={`${styles.label}`}
                        >
                          Video Title
                        </label>
                        <input
                          type="text"
                          name="videoTitle"
                          id="videoTitle"
                          className={`${styles.input} mb-2`}
                          placeholder="Video Title"
                          value={courseContent.title}
                          onChange={(e) => handleUpdateCourseContent(e, index, "title")}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="videoUrl" className={`${styles.label}`}>
                          Video URL
                        </label>
                        <input
                          type="text"
                          name="videoUrl"
                          id="videoUrl"
                          className={`${styles.input} mb-2`}
                          placeholder="Video URL"
                          value={courseContent.videoUrl}
                          onChange={(e) => handleUpdateCourseContent(e, index, "videoUrl")}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="videoUrl" className={`${styles.label}`}>
                          Video Length
                        </label>
                        <input
                          type="number"
                          name="videoLength"
                          id="videoLength"
                          className={`${styles.input} mb-2`}
                          placeholder="Video Length"
                          value={courseContent.videoLength}
                          onChange={(e) => handleUpdateCourseContent(e, index, "videoLength")}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="videoUrl" className={`${styles.label}`}>
                          Video Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          className={`${styles.input}`}
                          value={courseContent.description}
                          onChange={(e) => handleUpdateCourseContent(e, index, "description")}
                          rows={6}
                          required
                        />
                      </div>
                      {courseContent.links.map(
                        (link: any, linkindex: number) => (
                          <div>
                            <div className="flex justify-between items-center">
                              <p className={`${styles.label}`}>
                                Link-{linkindex + 1}
                              </p>
                              <AiOutlineDelete
                                size={20}
                                className="cursor-pointer dark:text-white"
                                onClick={() =>
                                  handleDeleteLink(linkindex, index)
                                }
                              />
                            </div>
                            <input
                              type="text"
                              name="linkTitle"
                              id="linkTitle"
                              className={`${styles.input} mb-2`}
                              placeholder="Source Code - Title"
                              value={link.title}
                              onChange={(e) =>
                                handleUpdateLink(e, linkindex, index, "title")
                              }
                              required
                            />
                            <input
                              type="text"
                              name="linkUrl"
                              id="linkUrl"
                              className={`${styles.input} mb-2`}
                              placeholder="Source Code - URL"
                              value={link.url}
                              onChange={(e) =>
                                handleUpdateLink(e, linkindex, index, "url")
                              }
                              required
                            />
                          </div>
                        )
                      )}
                      <p
                        className="font-Poppins text-sm font-medium dark:text-white flex items-center mt-2rounded-md duration-150 cursor-pointer w-32 gap-1"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg size={20} /> Add Link
                      </p>
                    </>
                  )}
                </div>
                {index === courseContentData.length - 1 && (
                  <p
                    className="font-Poppins text-sm font-medium dark:text-white flex items-center mt-4 rounded-md duration-150 cursor-pointer w-32 gap-1 pb-4"
                    onClick={() => handleAddContent(courseContent)}
                  >
                    <AiOutlinePlusCircle size={20} /> Add Content
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <p
          className="font-Poppins text-sm font-medium dark:text-white flex items-center mt-4 rounded-md duration-150 cursor-pointer w-full pl-4 gap-1"
          onClick={() => handleAddSection()}
        >
          <AiOutlinePlusCircle size={20} /> Add New Section
        </p>
      </form>
      <div className="flex justify-between">
        <div className="w-[30%] my-8">
          <button
            className={`${styles.button}`}
            onClick={() => setActive(active - 1)}
          >
            Prev
          </button>
        </div>
        <div className="w-[30%] my-8">
          <button className={`${styles.button}`} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
