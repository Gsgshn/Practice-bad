import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './Table.css';

const numberWithSpaces = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const Table = (props) => {
  const renderDataRow = (title, data) => {
    if (title === 'Факт отгрузки' || title === 'Факт оплаты' || title === 'Факт реализации( из 1С)') {
      return (
        <tr>
          <td>{title}</td>
          <td colSpan="3" className="text-right">{numberWithSpaces(data)}</td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>{title}</td>
          <td className="text-right max-width">{numberWithSpaces(data.plan)}</td>
          <td className="text-right max-width">{numberWithSpaces(data.fact)}</td>
          <td className="text-center max-width">{data.percent}</td>
        </tr>
      );
    }
  };

  return (
    <>
      <div className="">
        <div className="">
          <Card style={{ maxWidth: '900px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #dee2e6', background: '#FFFAFA' }}>
            <Card.Body>
              <table className="table table-bordered table-sm custom-bg-color">
                <colgroup>
                  <col className="col" />
                  <col className="max-width" />
                  <col className="max-width" />
                  <col className="max-width" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" className="text-right">План</th>
                    <th scope="col" className="text-right">Факт</th>
                    <th scope="col" className="text-center">Процент</th>
                  </tr>
                </thead>
                <tbody>
                  {renderDataRow('Выполнение плана отгрузки', props.data.current.shipment)}
                  {renderDataRow('Выполнение плана оплаты', props.data.current.payment)}
                  {renderDataRow('Выполнение плана выпуска продукции', props.data.current.release)}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Table;
