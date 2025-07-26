export default function Home() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fefae0', padding: '20px' }}>
      <div style={{
        backgroundColor: '#fff3c4',
        padding: '16px',
        borderRadius: '12px',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '18px' }}>
          🇺🇸 WLD <span style={{ float: 'right' }}>Balance de Tokens: <b>11.54</b></span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ backgroundColor: '#dff7f4', padding: '8px', borderRadius: '8px', flex: 1, marginRight: '4px' }}>
            🥛 Leche <b>2.4K</b>
          </div>
          <div style={{ backgroundColor: '#ffe8b3', padding: '8px', borderRadius: '8px', flex: 1, marginLeft: '4px' }}>
            🧀 Queso
          </div>
        </div>

        <p style={{ fontSize: '14px', marginBottom: '16px' }}>
          Las recompensas se acumulan por dos días, ¡procurá reclamarlas diariamente!
        </p>

        <h3 style={{ marginBottom: '8px' }}>🛒 Comprar Queso (Alimenta tu Granja)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          {["0.15", "0.25", "1 WLD", "3 WLD", "5 WLD", "10 WLD", "25 WLD", "50 WLD"].map((amount, idx) => (
            <button key={idx} style={{
              flex: '1 1 30%',
              padding: '6px',
              backgroundColor: amount === "1 WLD" ? '#46d3a1' : '#f1ead7',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}>
              {amount}
            </button>
          ))}
        </div>

        <p style={{ fontWeight: 'bold', color: '#3a7ca5', marginBottom: '16px' }}>✨ Obtendrás: 119.00 leche</p>

        <p style={{ marginBottom: '8px' }}>👥 Agregar Referido</p>

        <button style={{
          width: '100%',
          backgroundColor: '#45a6da',
          padding: '10px',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          marginBottom: '16px'
        }}>
          Buy 1 WLD
        </button>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            flex: 1,
            backgroundColor: '#dbc371',
            padding: '10px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}>🌿 FERMENTAR</button>
          <button style={{
            flex: 1,
            backgroundColor: '#f15454',
            padding: '10px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            color: 'white'
          }}>VENDER</button>
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '12px',
          backgroundColor: '#fcdde1',
          padding: '8px',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>+0.00 WLD</p>
      </div>
    </div>
  );
}
