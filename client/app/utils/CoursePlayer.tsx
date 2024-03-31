import axios from "axios";
import React, { FC, useEffect, useState } from "react";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }: Props) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    const getOtp = async () => {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "course/generateVdoOtp",
        {
          videoId: videoUrl,
        }
      );
      setVideoData(response.data);
    };
    getOtp();
  }, [videoUrl]);
  return (
    <div className="pt-[41%] relative">
      {
        videoData.otp !== "" && videoData.playbackInfo !== "" && <iframe
        src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=GBeE4G9n4dqBasmx`}
        style={{
          border: 0,
          maxWidth: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
        allowFullScreen={true}
        allow="encrypted-media"
      ></iframe>
      }
    </div>
  );
};

export default CoursePlayer;
