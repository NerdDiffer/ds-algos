/**
 * Elementary symbol table
 * It's a namespace for the following prototype methods...
 */
function SymbolTable() { }

/**
 * Adds a key-value pair to the table.
 * If `val` is null, then removes the `key` & associated value from table.
 * @param key, the key on the table as a String.
 * @param val, the value to assign to `key`. If `val === null` && `key` exists
 *   on the object, then this method will delete the property, `key`.
 * @return, `true` if deleting a property. If adding or overwriting a key,
 *   then it does not return anything.
 */
SymbolTable.prototype.put = function(key, val) {
  if (this.hasOwnProperty(key) && val === null) {
    // `delete` keyword returns true if the property, `key`,
    // is marked as configurable, which is the default in this implementation.
    return delete this[key];
  }
  // be careful: if you are trying to delete a property and that property does
  // not exist, then this method will actually create a new property, `key`,
  // and set its value to `null`
  this[key] = val;
};

/**
 * Return the value paired with the key
 * @param key, the property on the object
 * @return, the value associated with the key. Or `null` if key does not exist
 */
SymbolTable.prototype.get = function(key) {
  if (!this[key]) { return null; }
  return this[key];
};

/**
 * Remove key & its value from table
 * @param key, the property on the object
 * @return true, if the operation succeeds
 */
SymbolTable.prototype.delete = function(key) {
  // if the `key` does not exist as a property on the object, then this method
  // actually will tell `put` to create a new property, `key`, and set its value
  // to `null`.
  this.put(key, null);
};

// is there a value paired with the key?
SymbolTable.prototype.contains = function(key) {
  return this.get(key) !== null;
};

/**
 * Get a list of all keys defined on the object.
 * Uses `Object#keys` to return an array of all enumerable properties.
 * @return, an Array of all enumerable properties defined on the object.
 */
SymbolTable.prototype.keys = function() {
  return Object.keys(this);
};

// is the table empty or not?
SymbolTable.prototype.isEmpty = function() {
  return this.size() === 0;
};

// return number of key-value pairs in table
SymbolTable.prototype.size = function() {
  return this.keys().length;
};

module.exports = SymbolTable;
