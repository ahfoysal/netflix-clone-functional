import { Spinner } from "@nextui-org/react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="h-screen flex justify-center items-center">
        <Spinner  color="danger"/>
    </div>
  }