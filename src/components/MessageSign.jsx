import SignMessage from "./SignMessage";
import VerifyMessage from "./VerifyMessage";

export default function MessageSign() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/2">
        <SignMessage />
      </div>
      <div className="w-full lg:w-1/2">
        <VerifyMessage />
      </div>
    </div>
  );
}
