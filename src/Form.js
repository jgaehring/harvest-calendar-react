import React from "react";

function Form ({ crops, updateCrop }) {
  return (
    <form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Season One Starts</th>
            <th>Season One Ends</th>
            <th>Season Two Starts</th>
            <th>Season Two Ends</th>
          </tr>
        </thead>
        <tbody>
          {
            crops.map((crop, index) => (
              <tr key={`crop-input-${index}`}>
                <td>
                  <input
                    type="text" 
                    name="0-name" 
                    value={crop.name ? crop.name : ""} 
                    onChange={
                      e => updateCrop(index, {name: e.target.value})
                    }
                  />
                </td>
                <td>
                  <input
                    type="date" 
                    name="0-start-one" 
                    value={
                      crop.seasons[0]
                        ? crop.seasons[0].start
                        : "" 
                    }
                    onChange={
                      e => updateCrop(index, {startOne: e.target.value})
                    }
                  />
                </td>
                <td>
                  <input
                    type="date" 
                    name="0-end-one" 
                    value={
                      crop.seasons[0]
                        ? crop.seasons[0].end
                        : "" 
                    }
                    onChange={
                      e => updateCrop(index, {endOne: e.target.value})
                    }
                  />
                </td>
                <td>
                  <input
                    type="date" 
                    name="0-start-two" 
                    value={
                      crop.seasons[1]
                        ? crop.seasons[1].start
                        : "" 
                    }
                    onChange={
                      e => updateCrop(index, {startTwo: e.target.value})
                    }
                  />
                </td>
                <td>
                  <input
                    type="date" 
                    name="0-end-two" 
                    value={
                      crop.seasons[1]
                        ? crop.seasons[1].end
                        : "" 
                    }
                    onChange={
                      e => updateCrop(index, {endTwo: e.target.value})
                    }
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </form>
  );
}

export default Form;