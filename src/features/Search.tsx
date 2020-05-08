import * as React from 'react';

export const Search = () => {
  const [formValue, setFormValue] = React.useState<string>('');
  React.useEffect(() => {
    console.log('form value is', formValue);
  }, [formValue])
// we have to take the input and send it across multiple apis 
// the api calls are both asynchronous, wondering if we should wait for them both to be sent back or just send which one resolves first 
  const onSubmit = () => {

  }
  return (
    <form>
      <input placeholder="search for events, artists, teams or venues" value={formValue} onChange={(e) => setFormValue(e.target.value)}>
      </input>
    </form>
  ) 
}