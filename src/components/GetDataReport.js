import axios from "axios";
import { useState } from 'react';
import Table from "./Table";
import Chart from "./Chart";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import TotalPieCharts from "./TotalPieCharts";
import BarCharts from "./BarCharts";
import { Container, Row, Col } from "react-bootstrap";

function GetDataReport(props) {
  const [userData, setUserData] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGetData = async () => {
    try {
      const datePeriod = props.datePeriod;

      const response = await axios.post(
        'http://mobileserver.atomexp.ru:8090/api/byrole/directorView',
        { datePeriod },
        {
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );

      if (response.status === 200) {
        setResponseData(response.data);
        setErrorMessage("");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
      }
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Button className='mt-4' onClick={handleGetData} style={{backgroundColor:'#4D92E2' }} >Получить данные</Button>{' '}

      {errorMessage && <h3 style={{color:"black"}}>{errorMessage}!</h3>}

      {responseData && (
        <div className="dashboard-content me-5">
          <div className="container-fluid">
            <div className="row">
           

              <div className="col-lg-4">
                <div className="card mb-5 border-0" style={{ background: '#FFFAFA', minWidth:'' }}>
                  <div className="card-body p-3 rounded" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Chart data={responseData} />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card mb-4 border-0" style={{ background: '#FFFAFA' }}>
                  <div className="card-body p-3 rounded" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <TotalPieCharts data={responseData} />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card mb-4 border-0" style={{ background: '#FFFAFA' }}>
                  <div className="card-body p-3 rounded" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <BarCharts data={responseData} />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 d-flex justify-content-center mb-5">
              
                <Table data={responseData} />
              
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetDataReport;