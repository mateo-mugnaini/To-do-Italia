const ThemeList = ({ handleChangeTheme, categories }) => {
  console.log("🚀 ~ ThemeList ~ categories:", categories);

  return (
    <div>
      {categories &&
        categories.map((cat, index) => {
          return (
            <button key={index} onClick={() => handleChangeTheme(cat)}>
              {cat}
            </button>
          );
        })}
    </div>
  );
};

export default ThemeList;
