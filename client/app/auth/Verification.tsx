import React, { FC, useEffect, useRef, useState } from "react";
import { styles } from "../utils/styles";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useActivationMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

type VerificationNumber = {
  [key: string]: string;
};

const Verification: FC<Props> = ({ setRoute }: Props) => {
  const [invalid, setInvalid] = useState<boolean>(false);
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error, data }] = useActivationMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message;
      toast.success(message || "Account activate successfully!");
      setRoute("login");
    }

    if (error) {
      setInvalid(true);
      const errorMessage = error as any;
      toast.error(errorMessage?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, error]);

  const inputRef = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verificationNumber, setVerificationNumber] =
    useState<VerificationNumber>({
      "0": "",
      "1": "",
      "2": "",
      "3": "",
    });

  const handleInputChange = (index: number, value: string) => {
    setInvalid(false);
    if (value.length < 2) {
      setVerificationNumber({ ...verificationNumber, [index]: value });
    }
    if (value === "" && index > 0) {
      inputRef[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRef[index + 1].current?.focus();
    }
  };

  const handleVerificationSubmit = async () => {
    const joinVerificationNumber = Object.values(verificationNumber).join("");

    if (joinVerificationNumber.length !== 4) {
      setInvalid(true);
      return;
    }

    await activation({
      activationToken: token,
      activationCode: joinVerificationNumber,
    });
  };

  return (
    <div className="w-full">
      <h3 className={`${styles.title}`}>Verification</h3>
      <div className="w-[60px] h-[60px] rounded-full mx-auto my-5 flex items-center justify-center bg-orange-500 dark:bg-orange-400 text-white">
        <VscWorkspaceTrusted size={35} />
      </div>
      <div className="flex justify-around items-center w-full my-10">
        {Object.keys(verificationNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            maxLength={1}
            className={`w-[65px] h-[65px] outline-none border-2 rounded-md text-4xl dark:text-white flex justify-center items-center font-Josefin text-center ${
              invalid
                ? "border-red-500 shake"
                : "border-slate-900 dark:border-white"
            }`}
            value={verificationNumber[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            ref={inputRef[index]}
          />
        ))}
      </div>
      <button className={`${styles.button}`} onClick={handleVerificationSubmit}>
        Verify OTP
      </button>
      <h5 className="mt-10 dark:text-white text-center font-Poppins font-medium text-sm">
        Go back to Login?{" "}
        <span
          className="text-orange-500 dark:text-orange-400 cursor-pointer"
          onClick={() => setRoute("login")}
        >
          Login
        </span>{" "}
      </h5>
    </div>
  );
};

export default Verification;
