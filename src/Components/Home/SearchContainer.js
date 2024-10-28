export default function SearchContainer() {
  return (
    <View style={styles.searchContainer}>
      <EvilIcons
        name="search"
        size={26}
        color="#a0a0a0"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products"
        placeholderTextColor="#a0a0a0"
      />
    </View>
  );
}
