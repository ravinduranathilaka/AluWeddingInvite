export function RsvpForm() {
  return <form className="rsvp-form" aria-describedby="rsvp-status">
    <div className="rsvp-fields">
      <label>Full name<input name="fullName" type="text" autoComplete="name" disabled /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" spellCheck={false} disabled /></label>
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" inputMode="tel" disabled /></label>
      <label>Guests<select name="guestCount" defaultValue="1" disabled><option value="1">1 guest</option></select></label>
    </div>
    <label className="rsvp-message">A note for the couple<textarea name="message" rows={4} disabled /></label>
    <button type="submit" disabled>RSVPs open soon</button>
    <p id="rsvp-status">This form will open once invitations are ready to receive responses.</p>
  </form>;
}
