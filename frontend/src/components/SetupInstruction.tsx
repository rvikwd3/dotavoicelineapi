import { SyntheticEvent, useState } from "react";

type Props = {
  header: string;
  icon: (className: string) => JSX.Element;
  description: JSX.Element;
  imgSrcList: string[];
};

const SetupInstruction = ({
  header,
  icon,
  description,
  imgSrcList,
}: Props): JSX.Element => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const carouselClickHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    const newIndex = (selectedImageIndex + 1) % imgSrcList.length;
    setSelectedImageIndex(newIndex);
  }

  return (
    <div className="setupInstructionFlexContainer">
      <div className="content">
        <div className="subtitle">Setup Instructions</div>
        <div className="headerContainer">
          {icon("headerIcon")}
          <span className="headerText epilogue">{header}</span>
        </div>
        <div className="description">{description}</div>
      </div>
      <div className="carousel">
        <div className="images" onClick={carouselClickHandler}>
          {imgSrcList.map((src, i) => (
            <img
              key={`imgSrc${i}`}
              className={`setupInstructionImage${selectedImageIndex === i ? " selectedImage" : ""}`}
              id={`carouselImage${i}`}
              src={imgSrcList[i]}
            />
          ))}
        </div>
        <div className="carouselSelectorContainer">
          {imgSrcList.length <= 1 ? (
            <></>
          ) : (
            imgSrcList.map((src, i) => (
              <div
                key={src}
                className={`carouselSelector${
                  selectedImageIndex === i ? " selectedCarousel" : ""
                }`}
                onClick={() => setSelectedImageIndex(i)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupInstruction;
