import React from 'react';
import { useRef } from 'react';
const Chef = () => {
  const description = useRef(), experience = useRef(), worksAt = useRef(), image = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const form = new FormData();
      form.append('description', description.current.value);
      form.append('worksAt', worksAt.current.value);
      form.append('experience', experience.current.value);
      form.append('image', image.current.files[0]);
      const response = await fetch(`http://localhost:5000/api/chefApplications`, {
        method: "POST",
        headers: {
          'R-A-Token': localStorage.getItem('token')
        },
        body: form
      });
      if (response.status !== 201) return;
      alert("Added application");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-2/3 border border-gray-300 rounded p-8 bg-indigo-100">
        <form onSubmit={handleSubmit}>
          <h1 className="w-2/3 text-indigo-400 mb-4">Chef Application</h1>
          <textarea ref={description} className="w-full p-4 border border-gray-300 rounded mb-4" placeholder="Describe yourself here..." name="description"></textarea>
          <input ref={experience} className="w-full p-4 border border-gray-300 rounded mb-4" type="number" placeholder="Experience" name="number" />
          <input ref={worksAt} className="w-full p-4 border border-gray-300 rounded mb-4" type="text" placeholder="The place you work at here..." name="text" />
          <input ref={image} className="w-full p-4 border bg-white border-gray-300 rounded mb-4" type="file" accept='image/*' placeholder="File" name="file" />
          <button className="w-full p-4 bg-indigo-500 text-white rounded hover:bg-indigo-600" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Chef;