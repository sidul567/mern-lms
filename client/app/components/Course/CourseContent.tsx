import React, { FC, useState, useRef, useEffect } from "react";
import { LuDot } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
};

const CourseContent: FC<Props> = ({ data }) => {
  const [activeSection, setActiveSection] = useState<Set<string>>(
    new Set<string>()
  );
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleClickActiveSection = (section: string) => {
    const newActiveSections = new Set(activeSection);
    if (newActiveSections.has(section)) {
      newActiveSections.delete(section);
    } else {
      newActiveSections.add(section);
    }
    setActiveSection(newActiveSections);
  };

  const videoSections = data && [
    ...new Set<string>(data?.courseData?.map((item: any) => item?.videoSection)),
  ];

  useEffect(() => {
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        ref.style.maxHeight = activeSection.has(ref.dataset.section as string)
          ? `${ref.scrollHeight}px`
          : "0px";
      }
    });
  }, [activeSection]);

  return (
    <div className="flex flex-col gap-4">
      {videoSections?.map((section: string) => {
        const sectionVideos: any[] = data?.courseData?.filter(
          (item: any) => item?.videoSection === section
        );

        const totalVideos = sectionVideos.length;
        const sectionVideosLength = sectionVideos.reduce(
          (total, item) => total + item.videoLength,
          0
        );
        const sectionVideosHours = sectionVideosLength / 60;

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
                  !activeSection.has(section) ? "rotate-0" : "rotate-180"
                }`}
              />
            </div>
            <div
              ref={(el) => (sectionRefs.current[section] = el)}
              data-section={section}
              className="text-sm font-Poppins w-full bg-slate-50 dark:bg-slate-800 transition-[max-height] duration-300 overflow-hidden ease-in-out dark:text-white pl-6 cursor-pointer"
              style={{ maxHeight: "0px" }}
            >
              {sectionVideos.map((item, index) => (
                <div key={index} className={`flex gap-2 items-start pt-2 ${index === sectionVideos.length-1 && "pb-4"}`}>
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

export default CourseContent;
