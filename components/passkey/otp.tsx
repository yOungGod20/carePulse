import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
interface OtpProps {
  passkey: string;
  setPasskey: any;
}
const Otp = ({ passkey, setPasskey }: OtpProps) => {
  return (
    <InputOTP
      maxLength={6}
      value={passkey}
      onChange={(value) => {
        setPasskey(value);
      }}
    >
      <InputOTPGroup className="shad-otp">
        <InputOTPSlot className="shad-otp-slot" index={0} />
        <InputOTPSlot className="shad-otp-slot" index={1} />
        <InputOTPSlot className="shad-otp-slot" index={2} />
        <InputOTPSlot className="shad-otp-slot" index={3} />
        <InputOTPSlot className="shad-otp-slot" index={4} />
        <InputOTPSlot className="shad-otp-slot" index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
};

export default Otp;
