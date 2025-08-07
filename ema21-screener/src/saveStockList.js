import { fetchStockList } from "./fetchStockList";

export const saveStockListLocally = async () => {
  const stocks = await fetchStockList();

  const equityStocks = stocks.filter((s) =>
    s.symbol && s.symbol.length > 0 && s.name
  );

  const blob = new Blob([JSON.stringify(equityStocks, null, 2)], {
    type: "application/json",
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "dhan_stock_list.json";
  a.click();
};
