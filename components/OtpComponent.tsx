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
    <div className="flex flex-col justify-center w-full h-full items-center p-8 gap-5">
      <h3 className="text-xl font-semibold">This form is protected. kindly enter the right password to get access.</h3>
      <Otp length={4} otp={otp} onOtpChange={handleOtpChange} err={err} />
    </div>
  );
};

export default OtpComponent;
