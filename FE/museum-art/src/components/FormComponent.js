import { Box } from "@mui/material/";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material/";
import { Input } from "@mui/material/";

const FormComponent = ({
  handleForm,
  radio,
  searchTerm,
  setRadio,
  setSearchTerm,
}) => {
  return (
    <form onSubmit={(e) => handleForm(e)}>
      <Box m={2}>
        <RadioGroup
          row
          value={radio}
          onChange={(e) => setRadio(e.target.value)}
        >
          <FormControlLabel control={<Radio />} value="all" label="all" />
          <FormControlLabel control={<Radio />} value="potery" label="potery" />
          <FormControlLabel
            control={<Radio />}
            value="painting"
            label="painting"
          />
        </RadioGroup>
      </Box>

      <Input
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

export default FormComponent;
