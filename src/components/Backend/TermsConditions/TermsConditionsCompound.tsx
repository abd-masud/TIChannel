"use client";

import React from "react";
import { Form, Input, Button } from "antd";

export const TermsConditionsCompound = () => {
  const initialValues = {
    terms: JSON.stringify(
      "Terms & Conditions Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi maiores officia minima, omnis eaque quos facilis ex at voluptatibus id amet voluptatem ducimus ea blanditiis, inventore quidem numquam. Ut consequatur totam enim vel tempore assumenda molestias, commodi minima itaque a mollitia cum tempora quibusdam ipsam dolore natus aut omnis error ratione inventore, sequi placeat doloribus? Nihil quod corrupti voluptates accusantium eum, minima error reiciendis corporis optio aspernatur esse nobis quidem officia vel provident ducimus et natus maiores porro, deserunt aut molestias quos! Veritatis non excepturi at autem repudiandae vitae eligendi in earum libero possimus odio, ea, culpa quos obcaecati vel."
    ),
  };
  const onFinish = (values: string) => {
    console.log("Form values:", values);
  };

  return (
    <main>
      <Form
        className="lg:flex justify-between gap-4"
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <div className="bg-white rounded border p-5 shadow-md w-full h-full mb-5">
          <p className="border-b pb-5 mb-5 font-bold">Terms & Conditions</p>

          <Form.Item
            label="Terms & Conditions"
            name="terms"
            rules={[
              { required: true, message: "Please enter terms & conditions!" },
            ]}
          >
            <Input.TextArea placeholder="Enter terms & conditions" rows={20} />
          </Form.Item>
          <Form.Item>
            <Button className="flex" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </main>
  );
};
