import { styles } from "@/app/utils/styles";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { FaCirclePlus } from "react-icons/fa6";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  active,
  benefits,
  prerequisites,
  setActive,
  setBenefits,
  setPrerequisites,
}: Props) => {
  const handleChangeBenefit = (e: any, index: number) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = {...benefits[index]};
    updatedBenefits[index].title = e.target.value;
    setBenefits(updatedBenefits);
  };

  const handleChangePrerequisite = (e: any, index: number) => {
    const updatedPrerequisite = [...prerequisites];
    updatedPrerequisite[index] = {...prerequisites[index]};
    updatedPrerequisite[index].title = e.target.value;
    setPrerequisites(updatedPrerequisite);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleAddPrequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleNext = ()=>{
    const isExistBenefits = benefits.every((benefit)=>benefit.title.trim() !== "");
    const isExistPrerequisites = prerequisites.every((prerequisite)=>prerequisite.title.trim() !== "");
    
    if(isExistBenefits && isExistPrerequisites){
      setActive(active+1);
    }else{
      toast.error("Please fill up all the fields!");
    }
  }  

  return (
    <div className="w-[95%] 800px:w-[80%]">
      <div>
        <label htmlFor="benefits" className={`${styles.label}`}>
          What is the benefits for students of this course?
        </label>
        {benefits.map((benefit, index) => (
          <input
            type="text"
            name="name"
            id="name"
            className={`${styles.input} mb-2`}
            placeholder="You will be able to make an lms platform"
            value={benefit.title}
            onChange={(e) => handleChangeBenefit(e, index)}
            required
          />
        ))}
        <FaCirclePlus
          size={30}
          className="mt-2 dark:text-white cursor-pointer"
          onClick={handleAddBenefit}
        />
      </div>
      <div>
        <label htmlFor="benefits" className={`${styles.label}`}>
          What is the prerequisites for start this course?
        </label>
        {prerequisites.map((prerequisite, index) => (
          <input
            type="text"
            name="name"
            id="name"
            className={`${styles.input} mb-2`}
            placeholder="You need to know the basics of MERN"
            value={prerequisite.title}
            onChange={(e) => handleChangePrerequisite(e, index)}
            required
          />
        ))}
        <FaCirclePlus
          size={30}
          className="mt-2 dark:text-white cursor-pointer"
          onClick={handleAddPrequisite}
        />
      </div>
      <div className="flex justify-between">
        <div className="w-[30%] my-8">
          <button className={`${styles.button}`} onClick={()=>setActive(active-1)}>Prev</button>
        </div>
        <div className="w-[30%] my-8">
        <button className={`${styles.button}`} onClick={handleNext}>Next</button>
        </div> 
      </div>
    </div>
  );
};

export default CourseData;
