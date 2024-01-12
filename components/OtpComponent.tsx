import Otp from "./ui/Otp";

const OtpComponent = ({
  otp,
  handleOtpChange,
  err,
}: {
  otp: number;
  handleOtpChange: (value: number) => void;
  err: boolean;
}) => {
  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <Otp length={4} otp={otp} onOtpChange={handleOtpChange} err={err} />
    </div>
  );
};

export default OtpComponent;
