import yfinance as yf
import pandas as pd
import sys
import json
from datetime import datetime, timedelta

def save_proof_csv():
    """Saves a CSV as proof of connection. Moved to a function to avoid slowing down every request."""
    try:
        ticker = yf.Ticker("AAPL")
        # Using history() is often more reliable than download() in recent yfinance versions
        df = ticker.history(start="2020-01-01")
        
        if df.empty:
            sys.stderr.write("Proof CSV failed: No data returned from yfinance\n")
            return

        output_file = r"E:\Github\AAPL.csv"
        df.to_csv(output_file)
        sys.stderr.write(f"Proof Saved: {len(df)} rows to {output_file}\n")
    except Exception as e:
        sys.stderr.write(f"Proof CSV failed: {str(e)}\n")

def get_stock_data(symbol, period="1y"):
    try:
        # Check for multiple symbols (comma-separated)
        if "," in symbol:
            symbols = [s.strip() for s in symbol.split(",")]
            data = yf.download(symbols, period=period, group_by='ticker', progress=False)
            
            results = {}
            for sym in symbols:
                # Handle cases where yf.download returns different shapes based on count
                df = data[sym] if len(symbols) > 1 else data
                bars = []
                for date, row in df.dropna().iterrows():
                    bars.append({
                        "date": date.strftime('%Y-%m-%d'),
                        "open": float(row['Open']),
                        "close": float(row['Close'])
                    })
                results[sym] = {"bars": bars, "name": sym}
            return results

        # Single symbol logic (original)
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period=period)
        bars = []
        for date, row in hist.iterrows():
            bars.append({
                "date": date.strftime('%Y-%m-%d'),
                "open": float(row['Open']),
                "high": float(row['High']),
                "low": float(row['Low']),
                "close": float(row['Close']),
                "volume": int(row['Volume'])
            })
        
        # Return all bars for the chart
        return {"bars": bars, "name": ticker.info.get('longName', symbol)}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    # Ensure we have at least the symbol; default to 1y period if missing
    target_symbol = sys.argv[1] if len(sys.argv) > 1 else "AAPL"
    target_period = sys.argv[2] if len(sys.argv) > 2 else "1y"
    
    # Debugging: Log the received arguments to the server console (stderr)
    sys.stderr.write(f"Python fetching: {target_symbol} with period: {target_period}\n")

    # Run the proof logic only if we are looking at AAPL
    if target_symbol == "AAPL":
        save_proof_csv()
        
    print(json.dumps(get_stock_data(target_symbol, target_period)))