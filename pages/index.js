/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../layouts';

export default function AutoComplete() {
  const router = useRouter();
  const [options, setOptions] = React.useState([]);

  const getOptions = async value => {
    try {
      const { data } = await axios(
        `https://api.themoviedb.org/3/search/movie?api_key=5804e0e0ab9b27a39ee548bfa40e7793&language=en-US&query=${value}&page=1&include_adult=false`,
      );
      setOptions(data.results);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      <MuiAutocomplete
        id="combo-box-demo"
        options={options}
        onChange={(e, { id }) => router.push({ pathname: `/movies/${id}` })}
        getOptionLabel={option => option.title}
        style={{ width: 300, margin: 30 }}
        renderInput={params => (
          <TextField
            {...params}
            label="Trouver votre film..."
            variant="outlined"
            onChange={e => getOptions(e.target.value)}
          />
        )}
      />
    </Layout>
  );
}
