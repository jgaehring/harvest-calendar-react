import React from "react";
import { DatePicker, Input } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import "./Form.css";

const { RangePicker } = DatePicker;

function Form ({ crops, updateCrop, deleteCrop, id }) {
  return (
    <form id={id}>
      <div className="row">
        <div className="col-hd name">
          <h3>Name</h3>
        </div>
        <div className="col-hd season">
          <h3>Season(s)</h3>
        </div>
      </div>
      {
        crops.map((crop, index) => (
          <div className="row" key={`crop-row-${index}`}>
            <div className="name">
              <Input
                type="text" 
                name="0-name" 
                value={crop.name ? crop.name : ""} 
                onChange={
                  e => updateCrop(index, {name: e.target.value})
                }
                placeholder="Add crop name"
              />
            </div>
            <div className="season-one">
              <RangePicker 
                value={[moment(crop.seasons[0].start), moment(crop.seasons[0].end)]}
                onChange={
                  (_, date) => updateCrop(index, { startOne: date[0], endOne: date[1]})
                }
              />
            </div>
            <div className="season-two">
              <RangePicker 
                value={[moment(crop.seasons[1].start), moment(crop.seasons[1].end)]}
                onChange={
                  (_, date) => updateCrop(index, { startTwo: date[0], endTwo: date[1]})
                }
              />
            </div>
            <div className="delete">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => deleteCrop(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      }
    </form>
  );
}

export default Form;