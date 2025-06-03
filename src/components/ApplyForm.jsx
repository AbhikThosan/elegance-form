import { useState } from "react";
import { Form, Select, Input, Button, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

function ApplyForm() {
  const [form] = Form.useForm();
  const [selectedCountry, setSelectedCountry] = useState("Netherlands");

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    form.resetFields(["postalCode", "city", "state"]);
  };

  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Application Form
        </h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ country: "Netherlands" }}
          requiredMark={false}
        >
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please select a country" }]}
          >
            <Select onChange={handleCountryChange}>
              <Option value="Netherlands">Netherlands</Option>
              <Option value="Australia">Australia</Option>
            </Select>
          </Form.Item>

          <div className="flex gap-2">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
              className="flex-1"
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
              className="flex-1"
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </div>

          <Form.Item name="company" label="Company (Optional)">
            <Input placeholder="Enter company name" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          <Form.Item name="apartment" label="Apartment, Suite, etc. (Optional)">
            <Input placeholder="Enter apartment, suite, etc." />
          </Form.Item>

          <div className="flex gap-2">
            <Form.Item
              name="postalCode"
              label="Postal Code"
              rules={[
                { required: true, message: "Please enter postal code" },
                {
                  pattern:
                    selectedCountry === "Netherlands"
                      ? /^\d{4}\s?[A-Za-z]{2}$/
                      : /^\d{4}$/,
                  message:
                    selectedCountry === "Netherlands"
                      ? "Postal code must be 4 digits followed by 2 letters (e.g., 1234 AB)"
                      : "Postal code must be 4 digits",
                },
              ]}
              className="flex-1"
            >
              <Input
                placeholder={
                  selectedCountry === "Netherlands"
                    ? "e.g., 1234 AB"
                    : "e.g., 1234"
                }
              />
            </Form.Item>

            {selectedCountry === "Australia" && (
              <Form.Item
                name="state"
                label="State/Territory"
                rules={[
                  { required: true, message: "Please enter state/territory" },
                ]}
                className="flex-1"
              >
                <Input placeholder="Enter state/territory" />
              </Form.Item>
            )}

            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Please enter city" }]}
              className="flex-1"
            >
              <Input placeholder="Enter city" />
            </Form.Item>
          </div>

          <Form.Item
            name="phone"
            label={
              <span>
                Phone Number{" "}
                <Tooltip title="Netherlands: +31 6 12345678, Australia: +61 4 12345678">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern:
                  selectedCountry === "Netherlands"
                    ? /^\+31\s?\d{9}$/
                    : /^\+61\s?\d{9}$/,
                message:
                  selectedCountry === "Netherlands"
                    ? "Phone number must be in format +31 6 12345678"
                    : "Phone number must be in format +61 4 12345678",
              },
            ]}
          >
            <Input
              placeholder={
                selectedCountry === "Netherlands"
                  ? "+31 6 12345678"
                  : "+61 4 12345678"
              }
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ApplyForm;
