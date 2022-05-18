import React from "react";
const TransferList = () => {
  let t = [
    {
      from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
      to: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
      time: 12312413,
      id: 11,
      amount: 0.0002,
    },
    {
      from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
      to: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
      time: 12312413,
      id: 11,
      amount: 0.0002,
    },
    {
      from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
      to: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
      time: 12312413,
      id: 11,
      amount: 0.0002,
    },
    {
      from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
      to: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
      time: 12312413,
      id: 11,
      amount: 0.0002,
    },
    {
      from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
      to: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
      time: 12312413,
      id: 11,
      amount: 0.0002,
    },
    {
      from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
      to: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
      time: 12312413,
      id: 11,
      amount: 0.0002,
    },
  ];
  const TransferRow = ({ props }) => {
    return (
      <tr>
        <td className="text-left px-6 py-1">
          {props.from.substring(0, 6)}...
          {props.from.substring(props.from.length - 4)}
        </td>
        <td className="text-left px-6 py-1">
          {props.to.substring(0, 6)}...
          {props.to.substring(props.to.length - 4)}
        </td>
        <td className="text-left px-6 py-1 hidden sm:block">{props.time}</td>
        <td className="text-left px-6 py-1">#{props.id}</td>
        <td className="text-left px-6 py-1">{props.amount}</td>
      </tr>
    );
  };
  return (
    <div>
      <div className="text-xl p-5 font-semibold sm:text-2xl sm:text-center">
        Transactions
      </div>
      <div className="">
        <div className="flex justify-center flex-col sm:flex-row overflow-x-auto">
          <div className="w-10"></div>
          <table>
            <thead>
              <tr>
                <th className="text-left px-6 py-2">FROM</th>
                <th className="text-left px-6 py-2">TO</th>
                <th className="text-left px-6 py-2 hidden sm:block">TIME</th>
                <th className="text-left px-6 py-2">ID</th>
                <th className="text-left px-6 py-2">ETH</th>
              </tr>
            </thead>
            <tbody>
              {t.map((item, index) => (
                <TransferRow props={item} key={index} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex px-6 sm:justify-center">
          <button className="px-3 bg-black rounded text-white font-bold">
            {"<"}
          </button>
          <div className="py-1 px-5">Pafe 5 of 9</div>
          <button className="px-3 bg-black rounded text-white font-bold">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferList;
