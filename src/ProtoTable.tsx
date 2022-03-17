/** @format */

import { useState } from "react";

interface IProduct {
  id: string;
  material: string;
  weight: number;
  cost: number;
}

type ITableTask = "EDIT" | "ADD";

const ProtoProduct: IProduct = {
  id: "123",
  material: "metal",
  weight: 12,
  cost: 10
};

const TableActionButton = ({
  action,
  onClickHandler
}: {
  action: ITableTask;
  onClickHandler: () => void;
}) => {
  return (
    <>
      {action === "ADD" && (
        <td>
          <button onClick={() => onClickHandler()}>Agregar</button>
        </td>
      )}
      {action === "EDIT" && (
        <td>
          <button onClick={() => onClickHandler()}>Editar</button>
        </td>
      )}
    </>
  );
};

export default function ProtoTable({
  action = "EDIT"
}: {
  action: ITableTask;
}) {
  const [products, setProducts] = useState<IProduct[]>([
    ProtoProduct,
    ProtoProduct,
    ProtoProduct,
    ProtoProduct
  ]);
  const [toggleForm, setToggleForm] = useState<{
    toggled: boolean;
    action: ITableTask;
  }>({ toggled: false, action });
  return (
    <div>
      {JSON.stringify(toggleForm)}
      {toggleForm.toggled && toggleForm.action === "ADD" && (
        <form action="POST">
          {Object.keys(ProtoProduct).map((productAttribute) => (
            <input placeholder={productAttribute} />
          ))}
        </form>
      )}
      <table>
        <thead>
          <tr>
            {Object.keys(ProtoProduct).map((productAttribute) => (
              <th>{productAttribute}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <>
              <tr>
                {Object.keys(product).map((productAttributeKey) => (
                  <td>{product[productAttributeKey]}</td>
                ))}

                <TableActionButton
                  action={action}
                  onClickHandler={() => {
                    setToggleForm({ toggled: !toggleForm.toggled, action });
                  }}
                ></TableActionButton>
              </tr>
              {toggleForm.toggled && toggleForm.action === "EDIT" && (
                <tr>
                  {Object.keys(product).map((productAttributeKey) => (
                    <td>
                      <input
                        placeholder={productAttributeKey}
                        defaultValue={product[productAttributeKey]}
                      />
                    </td>
                  ))}
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
