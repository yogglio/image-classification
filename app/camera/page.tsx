"use client";

import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ImageMapping = {
  "Pulp Fiction": "pulp-fiction",
  "Blues Brothers": "blues-brothers",
};

type Prediction = {
  className: string;
  probability: number;
};

export default function Camera() {
  const [model, setModel] = useState<tmImage.CustomMobileNet>();
  const requestRef = useRef<Number>();
  const webcamRef = useRef<Webcam>(null);
  const [currentPrediction, setCurrentPrediction] = useState<Prediction>(
    {} as Prediction
  );
  const router = useRouter();
  const videoConstraints = {
    width: 200,
    height: 200,
    facingMode: "environment",
  };

  async function init() {
    const modelURL = "/image-model/model.json";
    const metadataURL = "/image-model/metadata.json";

    const model = await tmImage.load(modelURL, metadataURL);
    setModel(model);
  }

  async function loop() {
    const prediction = await predict();
    if (prediction) {
      setCurrentPrediction(prediction);
    }
    if (prediction && prediction.probability > 0.99) {
      const imageRoute =
        ImageMapping[prediction?.className as keyof typeof ImageMapping];
      //console.log("cancelAnimationFrame", requestRef.current);

      cancelAnimationFrame(requestRef.current as number);
      router.push(`/images/${imageRoute}`);
    } else {
      requestRef.current = requestAnimationFrame(loop);
      //console.log("currentAnimationFrame", requestRef.current);
    }
  }

  async function predict() {
    if (webcamRef.current) {
      const webcamCurrent = webcamRef.current as any;
      if (webcamCurrent.video.readyState === 4) {
        const prediction = await model!.predict(webcamCurrent.video);

        const classPrediction = prediction.reduce((prev, current) =>
          prev.probability > current.probability ? prev : current
        );

        return classPrediction;

        // console.log(
        //   classPrediction.className +
        //     ": " +
        //     classPrediction.probability.toFixed(2)
        // );
      }
    }
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (model) {
      console.log("start");
      requestRef.current = requestAnimationFrame(loop);
    }
  }, [model]);

  return (
    <main className="max-w-lg mx-auto">
      <Webcam
        audio={false}
        id="img"
        ref={webcamRef}
        height={800}
        screenshotFormat="image/jpeg"
        screenshotQuality={0.7}
        width={640}
        videoConstraints={videoConstraints}
      />
      <div className="flex flex-col items-center">
        Current Prediction: {currentPrediction.className}{" "}
        {currentPrediction.probability?.toFixed(2)}
      </div>
    </main>
  );
}
