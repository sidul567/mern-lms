import React, { FC, useState, useRef, useEffect, useMemo } from "react";
import { LuDot } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideoIndex?: number;
  setActiveVideoIndex?: (index: number) => void;
};

const CourseContentList: FC<Props> = ({
  data,
  activeVideoIndex,
  setActiveVideoIndex,
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  let totalCount = 0;

  const handleClickActiveSection = (section: string) => {
    setActiveSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  const videoSections = useMemo(() => {
    return data ? [...new Set<string>(data.map((item: any) => item.videoSection))] : [];
  }, [data]);

  useEffect(() => {
    if (videoSections?.length > 0) {
      setActiveSection(videoSections[0]);
    }
  }, [videoSections]);

  useEffect(() => {
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        ref.style.maxHeight =
          activeSection === ref.dataset.section
            ? `${ref.scrollHeight}px`
            : "0px";
      }
    });
  }, [activeSection]);

  return (
    <div className="flex flex-col gap-4">
      {videoSections?.map((section: string, index: number) => {
        const sectionVideos: any[] = data?.filter(
          (item: any) => item?.videoSection === section
        );

        const totalVideos = sectionVideos.length;
        const sectionVideosLength = sectionVideos.reduce(
          (total, item) => total + item.videoLength,
          0
        );
        const sectionVideosHours = sectionVideosLength / 60;
        const sectionStartIndex = totalCount;
        totalCount += totalVideos;

        return (
          <div key={section} className="w-full rounded-sm shadow-md">
            <div
              className="dark:text-white w-full p-3 font-Poppins bg-slate-50 flex justify-between items-center dark:bg-slate-800 relative cursor-pointer"
              onClick={() => handleClickActiveSection(section)}
            >
              <div className="bg-transparent outline-none w-full">
                <div>
                  <p className="text-lg font-medium text-black dark:text-white flex gap-2 items-center">
                    {section} <LuDot size={20} className="dark:white" />{" "}
                    {sectionVideosLength < 60
                      ? sectionVideosLength
                      : sectionVideosHours.toFixed(2)}{" "}
                    {sectionVideosLength < 60 ? "minutes" : "hours"}
                  </p>
                  <p className="text-base font-medium text-black dark:text-white">
                    {totalVideos} Lessons
                  </p>
                </div>
              </div>
              <MdKeyboardArrowDown
                size={25}
                className={`cursor-pointer duration-300 ${
                  activeSection === section ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <div
              ref={(el) => (sectionRefs.current[section] = el)}
              data-section={section}
              className="text-sm font-Poppins w-full bg-slate-50 dark:bg-slate-800 transition-[max-height] duration-300 overflow-hidden ease-in-out dark:text-white"
              style={{ maxHeight: "0px" }}
            >
              {sectionVideos.map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-2 items-start pt-2 cursor-pointer hover:bg-slate-200 hover:dark:bg-gray-900 px-3 pl-6 pb-2 duration-300 mb-1 ${
                    index === sectionVideos.length - 1 && "!mb-2"
                  } ${
                    sectionStartIndex + index === activeVideoIndex &&
                    "bg-slate-200 dark:bg-gray-900"
                  }`}
                  onClick={() =>
                    setActiveVideoIndex &&
                    setActiveVideoIndex(sectionStartIndex + index)
                  }
                >
                  <MdOutlineOndemandVideo
                    size={24}
                    className="text-orange-500"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-Poppins text-black dark:text-white text-base">
                      {item.title}
                    </p>
                    <p className="font-Poppins text-black dark:text-white text-sm">
                      {item.videoLength} minutes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
