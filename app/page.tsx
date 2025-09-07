<label style={{ color: C.azul, fontSize: 14, marginTop: 12, display: "block", textAlign: "center" }}>
  E-mail
</label>
<input
  type="email"
  name="email"
  required
  style={{
    width: "100%", marginTop: 6, marginBottom: 12,
    border: `1px solid ${C.borda}`, borderRadius: 8, padding: "10px 12px"
  }}
/>

<label style={{ color: C.azul, fontSize: 14, marginTop: 12, display: "block", textAlign: "center" }}>
  WhatsApp (cód. país + DDD + número)
</label>
<input
  type="tel"
  name="telefone"
  required
  pattern="[\d\s()+-]{9,}"
  title="Digite um telefone válido (ex.: +55 11 91234-5678)"
  style={{
    width: "100%", marginTop: 6, marginBottom: 12,
    border: `1px solid ${C.borda}`, borderRadius: 8, padding: "10px 12px"
  }}
/>
