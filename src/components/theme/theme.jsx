const ThemeList = ({ handleChangeTheme }) => {
  return (
    <div>
      <button onClick={() => handleChangeTheme("All")}>All</button>
      <button onClick={() => handleChangeTheme("Documentation")}>
        Documentation
      </button>
    </div>
  );
};

export default ThemeList;
