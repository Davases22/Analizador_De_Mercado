import yfinance as yf
from flask import request, render_template, jsonify, Flask

app = Flask(__name__, static_folder='static', template_folder='.')

@app.route('/')
def index():
    return render_template('index.html')


# Ruta para obtener datos de la acción
@app.route('/get_stock_data', methods=['POST'])
def get_stock_data():
    try:
        ticker = request.get_json()['ticker']
        data = yf.Ticker(ticker).history(period='1d') 
        
        # Verifica si los datos retornan algo
        if data.empty:
            return jsonify({'error': 'No se encontraron datos para el ticker proporcionado'}), 404

        return jsonify({
            'currentPrice': data.iloc[-1].Close,
            'openPrice': data.iloc[-1].Open
        })
    except Exception as e:
        # Devuelve un mensaje de error si algo falla
        return jsonify({'error': str(e)}), 500  

if __name__ == '__main__':
    app.run(debug=True)
