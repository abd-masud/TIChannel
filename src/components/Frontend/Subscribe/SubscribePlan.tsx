"use client";

import React, { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bKash from "../../../../public/images/logo_bkash.png";
import sslcommerz from "../../../../public/images/logo-sslcommerz.png";
import Image from "next/image";

type PlanType = "12 Months" | "6 Months" | "1 Month";

export const SubscribePlan = () => {
  const [activePlan, setActivePlan] = useState<PlanType>("12 Months");

  const planDetails: Record<PlanType, { price: number; features: string[] }> = {
    "12 Months": {
      price: 999,
      features: [
        "12 months of premium access",
        "5 device logins",
        "Ad-free experience",
        "Exclusive content & high-definition streaming",
      ],
    },
    "6 Months": {
      price: 699,
      features: [
        "6 months of premium access",
        "3 device logins",
        "Ad-free experience",
        "Access to special events & more",
      ],
    },
    "1 Month": {
      price: 299,
      features: [
        "1 month of premium access",
        "1 device login",
        "Ad-free experience",
        "Enjoy short-term access to all features",
      ],
    },
  };

  return (
    <main className="bg-auth_bg bg-cover bg-center bg-fixed min-h-[calc(100vh-85px)] flex justify-center items-center">
      <div className="w-[500px] bg-[#66636342] backdrop-blur-lg sm:px-10 px-8 sm:py-14 py-12 mx-5">
        <div className="flex justify-between items-center pb-2 mb-4">
          <p className="text-[20px] font-bold text-white block">
            Choose a plan{" "}
            <span className="sm:inline-block hidden">& enjoy TI Channel</span>
          </p>
        </div>

        <div className="text-white mb-6">
          <p className="mb-2 font-bold">Plan Features:</p>
          {planDetails[activePlan].features.map((feature, index) => (
            <div className="flex items-start" key={index}>
              <FontAwesomeIcon
                className="h-3 w-3 mr-3 mt-[5px]"
                icon={faCheck}
              />
              <p className="mb-1">{feature}</p>
            </div>
          ))}
          {/* <p className="mt-2 font-bold">
            Price: {planDetails[activePlan].price}
          </p> */}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {(["12 Months", "6 Months", "1 Month"] as PlanType[]).map((plan) => (
            <button
              key={plan}
              className={`text-center py-2 rounded-lg bg-gray-800 text-white border-2 ${
                activePlan === plan ? "border-[#C11119]" : "border-gray-800"
              }`}
              onClick={() => setActivePlan(plan)}
            >
              <span className="block text-sm">{plan}</span>
              <span className="block text-xl font-bold">
                {planDetails[plan].price} <span className="text-sm">Tk</span>
              </span>
            </button>
          ))}
        </div>

        <div className="text-white mb-6">
          <p className="mb-2 font-bold">Pay by:</p>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <input
                type="radio"
                name="paymentMethod"
                id="bkash"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="bkash" className="text-sm">
                <Image className="h-8 w-auto" src={bKash} alt={""} />
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                id="card"
                className="mr-2"
              />
              <label htmlFor="card" className="text-sm">
                <Image className="h-8 w-auto" src={sslcommerz} alt={""} />
              </label>
            </div>
          </div>
        </div>

        <div className="text-white mb-6">
          <p className="mb-2 font-bold">Payment Summary:</p>
          <div className="flex justify-between">
            <p>Price</p>
            <p>{planDetails[activePlan].price} Tk</p>
          </div>
          <div className="flex justify-between">
            <p>Total Payable</p>
            <p>{planDetails[activePlan].price} Tk</p>
          </div>
        </div>

        <button className="w-full bg-primary text-white py-2 rounded text-[14px] font-[500]">
          Continue
        </button>
      </div>
    </main>
  );
};
