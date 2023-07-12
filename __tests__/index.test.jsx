import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/index";
import UploadFile from "../components/UploadFile";
import ImageComponent from "../components/ImageComponent";
import "@testing-library/jest-dom";

// describe("Home", () => {
//   it("renders heading and file upload here", () => {
//     render(<Home />);

//     const heading = screen.getByText(/facial emotion recogonition/i);
//     const input = screen.getByLabelText("Upload a file");

//     expect(input).toBeInTheDocument();
//     expect(heading).toBeInTheDocument();
//   });
// });

test("Uploads an image", async () => {
  render(
    <div>
      <label htmlFor="file-uploader">Upload file:</label>
      <input id="file-uploader" type="file" />
    </div>
  );
  const file = new File(["hello"], "hello.png", { type: "image/png" });

  const input = screen.getByLabelText(/upload file/i);

  fireEvent.change(input, { target: { files: [file] } });
  // userEvent.upload(input, file);

  expect(input.files[0]).toBe(file);
});

// describe("Image Component", () => {
//   it("renders a heading", () => {
//     render(<ImageComponent />);

//     userEvent.upload(screen.getByText("file-upload"));
//     const image = screen.getByRole("img");

//     expect(image).toBeInTheDocument();
//   });
// });
