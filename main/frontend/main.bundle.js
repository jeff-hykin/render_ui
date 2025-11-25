export default `var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// https://deno.land/x/good@1.13.2.0/flattened/empty_generator_object.js
var emptyGeneratorObject;
var init_empty_generator_object = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/empty_generator_object.js"() {
    emptyGeneratorObject = function* () {
    }();
    emptyGeneratorObject.length = 0;
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/make_iterator.js
var makeIterator;
var init_make_iterator = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/make_iterator.js"() {
    init_empty_generator_object();
    makeIterator = (value) => {
      if (typeof value?.next == "function") {
        return value;
      } else if (value == null) {
        return emptyGeneratorObject;
      } else if (typeof value[Symbol.iterator] == "function") {
        const iterator = value[Symbol.iterator]();
        if (!Number.isFinite(iterator?.length)) {
          if (Number.isFinite(value?.length)) {
            iterator.length = value.length;
          } else if (Number.isFinite(value?.size)) {
            iterator.length = value.size;
          }
        }
        return iterator;
      } else if (typeof value[Symbol.asyncIterator] == "function") {
        const iterator = value[Symbol.asyncIterator]();
        if (!Number.isFinite(iterator?.length)) {
          if (Number.isFinite(value?.length)) {
            iterator.length = value.length;
          } else if (Number.isFinite(value?.size)) {
            iterator.length = value.size;
          }
        }
        return iterator;
      } else if (typeof value == "function") {
        return value();
      } else if (Object.getPrototypeOf(value).constructor == Object) {
        const entries = Object.entries(value);
        const output = entries[Symbol.iterator]();
        output.length = entries.length;
        return output;
      }
      return emptyGeneratorObject;
    };
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/iter_zip_long_sync.js
var innerIterZipLongSync, iterZipLongSync;
var init_iter_zip_long_sync = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/iter_zip_long_sync.js"() {
    init_make_iterator();
    innerIterZipLongSync = function* (...iterables) {
      const iterators = iterables.map(makeIterator);
      while (true) {
        const nexts = iterators.map((each) => each.next());
        if (nexts.every((each) => each.done)) {
          break;
        }
        yield nexts.map((each) => each.value);
      }
    };
    iterZipLongSync = function(...iterables) {
      const generatorObject = innerIterZipLongSync(...iterables);
      const finalLength = Math.max(...iterables.map((each) => typeof each != "function" && (typeof each?.length == "number" ? each?.length : each.size)));
      if (finalLength == finalLength) {
        generatorObject.length = finalLength;
      }
      return generatorObject;
    };
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/zip_long.js
var init_zip_long = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/zip_long.js"() {
    init_iter_zip_long_sync();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/capitalize.js
var init_capitalize = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/capitalize.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/indent.js
var indent;
var init_indent = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/indent.js"() {
    indent = ({ string, by = "    ", noLead = false }) => (noLead ? "" : by) + string.replace(/\\n/g, "\\n" + by);
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/typed_array__class.js
var TypedArray;
var init_typed_array_class = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/typed_array__class.js"() {
    TypedArray = typeof globalThis?.Uint8Array != "function" ? class {
    } : Object.getPrototypeOf(Uint8Array.prototype).constructor;
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/typed_array_classes.js
var typedArrayClasses;
var init_typed_array_classes = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/typed_array_classes.js"() {
    typedArrayClasses = [
      Uint16Array,
      Uint32Array,
      Uint8Array,
      Uint8ClampedArray,
      Int16Array,
      Int32Array,
      Int8Array,
      Float32Array,
      Float64Array
    ];
    if (globalThis.BigInt64Array) {
      typedArrayClasses.push(globalThis.BigInt64Array);
    }
    if (globalThis.BigUint64Array) {
      typedArrayClasses.push(globalThis.BigUint64Array);
    }
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/all_keys.js
var allKeys;
var init_all_keys = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/all_keys.js"() {
    allKeys = function(obj) {
      const listOfKeys = [];
      if (obj == null) {
        return [];
      }
      if (!(obj instanceof Object)) {
        obj = Object.getPrototypeOf(obj);
      }
      while (obj) {
        listOfKeys.push(Reflect.ownKeys(obj));
        obj = Object.getPrototypeOf(obj);
      }
      return [...new Set(listOfKeys.flat(1))];
    };
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_valid_identifier.js
function isValidIdentifier(value) {
  if (typeof value != "string") {
    return false;
  }
  const tmp = value.replace(/\\\\u([a-fA-F0-9]{4})|\\\\u\\{([0-9a-fA-F]{1,})\\}/g, function($0, $1, $2) {
    var codePoint = parseInt($2 || $1, 16);
    if (codePoint >= 55296 && codePoint <= 57343) {
      return "\\0";
    }
    return String.fromCodePoint(codePoint);
  });
  const es5Warning = !regexIdentifierES5.test(
    // Only Unicode escapes are allowed in ES5 identifiers.
    value.replace(/\\\\u([a-fA-F0-9]{4})/g, function($0, $1) {
      return String.fromCodePoint(parseInt($1, 16));
    })
  );
  var isReserved;
  if ((isReserved = regexES6ReservedWord.test(tmp)) || !regexIdentifier.test(tmp)) {
    return false;
  } else {
    return true;
  }
}
var regexIdentifier, regexIdentifierES5, regexES6ReservedWord;
var init_is_valid_identifier = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_valid_identifier.js"() {
    regexIdentifier = /^(?:[\\$A-Z_a-z\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B4\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0AF9\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58-\\u0C5A\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D5F-\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F5\\u13F8-\\u13FD\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2118-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309B-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA7AD\\uA7B0-\\uA7B7\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA8FD\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB65\\uAB70-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]|\\uD800[\\uDC00-\\uDC0B\\uDC0D-\\uDC26\\uDC28-\\uDC3A\\uDC3C\\uDC3D\\uDC3F-\\uDC4D\\uDC50-\\uDC5D\\uDC80-\\uDCFA\\uDD40-\\uDD74\\uDE80-\\uDE9C\\uDEA0-\\uDED0\\uDF00-\\uDF1F\\uDF30-\\uDF4A\\uDF50-\\uDF75\\uDF80-\\uDF9D\\uDFA0-\\uDFC3\\uDFC8-\\uDFCF\\uDFD1-\\uDFD5]|\\uD801[\\uDC00-\\uDC9D\\uDD00-\\uDD27\\uDD30-\\uDD63\\uDE00-\\uDF36\\uDF40-\\uDF55\\uDF60-\\uDF67]|\\uD802[\\uDC00-\\uDC05\\uDC08\\uDC0A-\\uDC35\\uDC37\\uDC38\\uDC3C\\uDC3F-\\uDC55\\uDC60-\\uDC76\\uDC80-\\uDC9E\\uDCE0-\\uDCF2\\uDCF4\\uDCF5\\uDD00-\\uDD15\\uDD20-\\uDD39\\uDD80-\\uDDB7\\uDDBE\\uDDBF\\uDE00\\uDE10-\\uDE13\\uDE15-\\uDE17\\uDE19-\\uDE33\\uDE60-\\uDE7C\\uDE80-\\uDE9C\\uDEC0-\\uDEC7\\uDEC9-\\uDEE4\\uDF00-\\uDF35\\uDF40-\\uDF55\\uDF60-\\uDF72\\uDF80-\\uDF91]|\\uD803[\\uDC00-\\uDC48\\uDC80-\\uDCB2\\uDCC0-\\uDCF2]|\\uD804[\\uDC03-\\uDC37\\uDC83-\\uDCAF\\uDCD0-\\uDCE8\\uDD03-\\uDD26\\uDD50-\\uDD72\\uDD76\\uDD83-\\uDDB2\\uDDC1-\\uDDC4\\uDDDA\\uDDDC\\uDE00-\\uDE11\\uDE13-\\uDE2B\\uDE80-\\uDE86\\uDE88\\uDE8A-\\uDE8D\\uDE8F-\\uDE9D\\uDE9F-\\uDEA8\\uDEB0-\\uDEDE\\uDF05-\\uDF0C\\uDF0F\\uDF10\\uDF13-\\uDF28\\uDF2A-\\uDF30\\uDF32\\uDF33\\uDF35-\\uDF39\\uDF3D\\uDF50\\uDF5D-\\uDF61]|\\uD805[\\uDC80-\\uDCAF\\uDCC4\\uDCC5\\uDCC7\\uDD80-\\uDDAE\\uDDD8-\\uDDDB\\uDE00-\\uDE2F\\uDE44\\uDE80-\\uDEAA\\uDF00-\\uDF19]|\\uD806[\\uDCA0-\\uDCDF\\uDCFF\\uDEC0-\\uDEF8]|\\uD808[\\uDC00-\\uDF99]|\\uD809[\\uDC00-\\uDC6E\\uDC80-\\uDD43]|[\\uD80C\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872][\\uDC00-\\uDFFF]|\\uD80D[\\uDC00-\\uDC2E]|\\uD811[\\uDC00-\\uDE46]|\\uD81A[\\uDC00-\\uDE38\\uDE40-\\uDE5E\\uDED0-\\uDEED\\uDF00-\\uDF2F\\uDF40-\\uDF43\\uDF63-\\uDF77\\uDF7D-\\uDF8F]|\\uD81B[\\uDF00-\\uDF44\\uDF50\\uDF93-\\uDF9F]|\\uD82C[\\uDC00\\uDC01]|\\uD82F[\\uDC00-\\uDC6A\\uDC70-\\uDC7C\\uDC80-\\uDC88\\uDC90-\\uDC99]|\\uD835[\\uDC00-\\uDC54\\uDC56-\\uDC9C\\uDC9E\\uDC9F\\uDCA2\\uDCA5\\uDCA6\\uDCA9-\\uDCAC\\uDCAE-\\uDCB9\\uDCBB\\uDCBD-\\uDCC3\\uDCC5-\\uDD05\\uDD07-\\uDD0A\\uDD0D-\\uDD14\\uDD16-\\uDD1C\\uDD1E-\\uDD39\\uDD3B-\\uDD3E\\uDD40-\\uDD44\\uDD46\\uDD4A-\\uDD50\\uDD52-\\uDEA5\\uDEA8-\\uDEC0\\uDEC2-\\uDEDA\\uDEDC-\\uDEFA\\uDEFC-\\uDF14\\uDF16-\\uDF34\\uDF36-\\uDF4E\\uDF50-\\uDF6E\\uDF70-\\uDF88\\uDF8A-\\uDFA8\\uDFAA-\\uDFC2\\uDFC4-\\uDFCB]|\\uD83A[\\uDC00-\\uDCC4]|\\uD83B[\\uDE00-\\uDE03\\uDE05-\\uDE1F\\uDE21\\uDE22\\uDE24\\uDE27\\uDE29-\\uDE32\\uDE34-\\uDE37\\uDE39\\uDE3B\\uDE42\\uDE47\\uDE49\\uDE4B\\uDE4D-\\uDE4F\\uDE51\\uDE52\\uDE54\\uDE57\\uDE59\\uDE5B\\uDE5D\\uDE5F\\uDE61\\uDE62\\uDE64\\uDE67-\\uDE6A\\uDE6C-\\uDE72\\uDE74-\\uDE77\\uDE79-\\uDE7C\\uDE7E\\uDE80-\\uDE89\\uDE8B-\\uDE9B\\uDEA1-\\uDEA3\\uDEA5-\\uDEA9\\uDEAB-\\uDEBB]|\\uD869[\\uDC00-\\uDED6\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF34\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1]|\\uD87E[\\uDC00-\\uDE1D])(?:[\\$0-9A-Z_a-z\\xAA\\xB5\\xB7\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0300-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u0483-\\u0487\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0610-\\u061A\\u0620-\\u0669\\u066E-\\u06D3\\u06D5-\\u06DC\\u06DF-\\u06E8\\u06EA-\\u06FC\\u06FF\\u0710-\\u074A\\u074D-\\u07B1\\u07C0-\\u07F5\\u07FA\\u0800-\\u082D\\u0840-\\u085B\\u08A0-\\u08B4\\u08E3-\\u0963\\u0966-\\u096F\\u0971-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09DC\\u09DD\\u09DF-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A59-\\u0A5C\\u0A5E\\u0A66-\\u0A75\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0AF9\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5C\\u0B5D\\u0B5F-\\u0B63\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C00-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C58-\\u0C5A\\u0C60-\\u0C63\\u0C66-\\u0C6F\\u0C81-\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CDE\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D01-\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D57\\u0D5F-\\u0D63\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DE6-\\u0DEF\\u0DF2\\u0DF3\\u0E01-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDC-\\u0EDF\\u0F00\\u0F18\\u0F19\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F39\\u0F3E-\\u0F47\\u0F49-\\u0F6C\\u0F71-\\u0F84\\u0F86-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1369-\\u1371\\u1380-\\u138F\\u13A0-\\u13F5\\u13F8-\\u13FD\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1714\\u1720-\\u1734\\u1740-\\u1753\\u1760-\\u176C\\u176E-\\u1770\\u1772\\u1773\\u1780-\\u17D3\\u17D7\\u17DC\\u17DD\\u17E0-\\u17E9\\u180B-\\u180D\\u1810-\\u1819\\u1820-\\u1877\\u1880-\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1920-\\u192B\\u1930-\\u193B\\u1946-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u19D0-\\u19DA\\u1A00-\\u1A1B\\u1A20-\\u1A5E\\u1A60-\\u1A7C\\u1A7F-\\u1A89\\u1A90-\\u1A99\\u1AA7\\u1AB0-\\u1ABD\\u1B00-\\u1B4B\\u1B50-\\u1B59\\u1B6B-\\u1B73\\u1B80-\\u1BF3\\u1C00-\\u1C37\\u1C40-\\u1C49\\u1C4D-\\u1C7D\\u1CD0-\\u1CD2\\u1CD4-\\u1CF6\\u1CF8\\u1CF9\\u1D00-\\u1DF5\\u1DFC-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u200C\\u200D\\u203F\\u2040\\u2054\\u2071\\u207F\\u2090-\\u209C\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2118-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D7F-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2DE0-\\u2DFF\\u3005-\\u3007\\u3021-\\u302F\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u3099-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA62B\\uA640-\\uA66F\\uA674-\\uA67D\\uA67F-\\uA6F1\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA7AD\\uA7B0-\\uA7B7\\uA7F7-\\uA827\\uA840-\\uA873\\uA880-\\uA8C4\\uA8D0-\\uA8D9\\uA8E0-\\uA8F7\\uA8FB\\uA8FD\\uA900-\\uA92D\\uA930-\\uA953\\uA960-\\uA97C\\uA980-\\uA9C0\\uA9CF-\\uA9D9\\uA9E0-\\uA9FE\\uAA00-\\uAA36\\uAA40-\\uAA4D\\uAA50-\\uAA59\\uAA60-\\uAA76\\uAA7A-\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEF\\uAAF2-\\uAAF6\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB65\\uAB70-\\uABEA\\uABEC\\uABED\\uABF0-\\uABF9\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE00-\\uFE0F\\uFE20-\\uFE2F\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF10-\\uFF19\\uFF21-\\uFF3A\\uFF3F\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]|\\uD800[\\uDC00-\\uDC0B\\uDC0D-\\uDC26\\uDC28-\\uDC3A\\uDC3C\\uDC3D\\uDC3F-\\uDC4D\\uDC50-\\uDC5D\\uDC80-\\uDCFA\\uDD40-\\uDD74\\uDDFD\\uDE80-\\uDE9C\\uDEA0-\\uDED0\\uDEE0\\uDF00-\\uDF1F\\uDF30-\\uDF4A\\uDF50-\\uDF7A\\uDF80-\\uDF9D\\uDFA0-\\uDFC3\\uDFC8-\\uDFCF\\uDFD1-\\uDFD5]|\\uD801[\\uDC00-\\uDC9D\\uDCA0-\\uDCA9\\uDD00-\\uDD27\\uDD30-\\uDD63\\uDE00-\\uDF36\\uDF40-\\uDF55\\uDF60-\\uDF67]|\\uD802[\\uDC00-\\uDC05\\uDC08\\uDC0A-\\uDC35\\uDC37\\uDC38\\uDC3C\\uDC3F-\\uDC55\\uDC60-\\uDC76\\uDC80-\\uDC9E\\uDCE0-\\uDCF2\\uDCF4\\uDCF5\\uDD00-\\uDD15\\uDD20-\\uDD39\\uDD80-\\uDDB7\\uDDBE\\uDDBF\\uDE00-\\uDE03\\uDE05\\uDE06\\uDE0C-\\uDE13\\uDE15-\\uDE17\\uDE19-\\uDE33\\uDE38-\\uDE3A\\uDE3F\\uDE60-\\uDE7C\\uDE80-\\uDE9C\\uDEC0-\\uDEC7\\uDEC9-\\uDEE6\\uDF00-\\uDF35\\uDF40-\\uDF55\\uDF60-\\uDF72\\uDF80-\\uDF91]|\\uD803[\\uDC00-\\uDC48\\uDC80-\\uDCB2\\uDCC0-\\uDCF2]|\\uD804[\\uDC00-\\uDC46\\uDC66-\\uDC6F\\uDC7F-\\uDCBA\\uDCD0-\\uDCE8\\uDCF0-\\uDCF9\\uDD00-\\uDD34\\uDD36-\\uDD3F\\uDD50-\\uDD73\\uDD76\\uDD80-\\uDDC4\\uDDCA-\\uDDCC\\uDDD0-\\uDDDA\\uDDDC\\uDE00-\\uDE11\\uDE13-\\uDE37\\uDE80-\\uDE86\\uDE88\\uDE8A-\\uDE8D\\uDE8F-\\uDE9D\\uDE9F-\\uDEA8\\uDEB0-\\uDEEA\\uDEF0-\\uDEF9\\uDF00-\\uDF03\\uDF05-\\uDF0C\\uDF0F\\uDF10\\uDF13-\\uDF28\\uDF2A-\\uDF30\\uDF32\\uDF33\\uDF35-\\uDF39\\uDF3C-\\uDF44\\uDF47\\uDF48\\uDF4B-\\uDF4D\\uDF50\\uDF57\\uDF5D-\\uDF63\\uDF66-\\uDF6C\\uDF70-\\uDF74]|\\uD805[\\uDC80-\\uDCC5\\uDCC7\\uDCD0-\\uDCD9\\uDD80-\\uDDB5\\uDDB8-\\uDDC0\\uDDD8-\\uDDDD\\uDE00-\\uDE40\\uDE44\\uDE50-\\uDE59\\uDE80-\\uDEB7\\uDEC0-\\uDEC9\\uDF00-\\uDF19\\uDF1D-\\uDF2B\\uDF30-\\uDF39]|\\uD806[\\uDCA0-\\uDCE9\\uDCFF\\uDEC0-\\uDEF8]|\\uD808[\\uDC00-\\uDF99]|\\uD809[\\uDC00-\\uDC6E\\uDC80-\\uDD43]|[\\uD80C\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872][\\uDC00-\\uDFFF]|\\uD80D[\\uDC00-\\uDC2E]|\\uD811[\\uDC00-\\uDE46]|\\uD81A[\\uDC00-\\uDE38\\uDE40-\\uDE5E\\uDE60-\\uDE69\\uDED0-\\uDEED\\uDEF0-\\uDEF4\\uDF00-\\uDF36\\uDF40-\\uDF43\\uDF50-\\uDF59\\uDF63-\\uDF77\\uDF7D-\\uDF8F]|\\uD81B[\\uDF00-\\uDF44\\uDF50-\\uDF7E\\uDF8F-\\uDF9F]|\\uD82C[\\uDC00\\uDC01]|\\uD82F[\\uDC00-\\uDC6A\\uDC70-\\uDC7C\\uDC80-\\uDC88\\uDC90-\\uDC99\\uDC9D\\uDC9E]|\\uD834[\\uDD65-\\uDD69\\uDD6D-\\uDD72\\uDD7B-\\uDD82\\uDD85-\\uDD8B\\uDDAA-\\uDDAD\\uDE42-\\uDE44]|\\uD835[\\uDC00-\\uDC54\\uDC56-\\uDC9C\\uDC9E\\uDC9F\\uDCA2\\uDCA5\\uDCA6\\uDCA9-\\uDCAC\\uDCAE-\\uDCB9\\uDCBB\\uDCBD-\\uDCC3\\uDCC5-\\uDD05\\uDD07-\\uDD0A\\uDD0D-\\uDD14\\uDD16-\\uDD1C\\uDD1E-\\uDD39\\uDD3B-\\uDD3E\\uDD40-\\uDD44\\uDD46\\uDD4A-\\uDD50\\uDD52-\\uDEA5\\uDEA8-\\uDEC0\\uDEC2-\\uDEDA\\uDEDC-\\uDEFA\\uDEFC-\\uDF14\\uDF16-\\uDF34\\uDF36-\\uDF4E\\uDF50-\\uDF6E\\uDF70-\\uDF88\\uDF8A-\\uDFA8\\uDFAA-\\uDFC2\\uDFC4-\\uDFCB\\uDFCE-\\uDFFF]|\\uD836[\\uDE00-\\uDE36\\uDE3B-\\uDE6C\\uDE75\\uDE84\\uDE9B-\\uDE9F\\uDEA1-\\uDEAF]|\\uD83A[\\uDC00-\\uDCC4\\uDCD0-\\uDCD6]|\\uD83B[\\uDE00-\\uDE03\\uDE05-\\uDE1F\\uDE21\\uDE22\\uDE24\\uDE27\\uDE29-\\uDE32\\uDE34-\\uDE37\\uDE39\\uDE3B\\uDE42\\uDE47\\uDE49\\uDE4B\\uDE4D-\\uDE4F\\uDE51\\uDE52\\uDE54\\uDE57\\uDE59\\uDE5B\\uDE5D\\uDE5F\\uDE61\\uDE62\\uDE64\\uDE67-\\uDE6A\\uDE6C-\\uDE72\\uDE74-\\uDE77\\uDE79-\\uDE7C\\uDE7E\\uDE80-\\uDE89\\uDE8B-\\uDE9B\\uDEA1-\\uDEA3\\uDEA5-\\uDEA9\\uDEAB-\\uDEBB]|\\uD869[\\uDC00-\\uDED6\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF34\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1]|\\uD87E[\\uDC00-\\uDE1D]|\\uDB40[\\uDD00-\\uDDEF])*$/;
    regexIdentifierES5 = /^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|null|this|true|void|with|break|catch|class|const|false|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)(?:[\\$A-Z_a-z\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B4\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0AF9\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58-\\u0C5A\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D5F-\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F5\\u13F8-\\u13FD\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA7AD\\uA7B0-\\uA7B7\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA8FD\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB65\\uAB70-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC])(?:[\\$0-9A-Z_a-z\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0300-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u0483-\\u0487\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0610-\\u061A\\u0620-\\u0669\\u066E-\\u06D3\\u06D5-\\u06DC\\u06DF-\\u06E8\\u06EA-\\u06FC\\u06FF\\u0710-\\u074A\\u074D-\\u07B1\\u07C0-\\u07F5\\u07FA\\u0800-\\u082D\\u0840-\\u085B\\u08A0-\\u08B4\\u08E3-\\u0963\\u0966-\\u096F\\u0971-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09DC\\u09DD\\u09DF-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A59-\\u0A5C\\u0A5E\\u0A66-\\u0A75\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0AF9\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5C\\u0B5D\\u0B5F-\\u0B63\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C00-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C58-\\u0C5A\\u0C60-\\u0C63\\u0C66-\\u0C6F\\u0C81-\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CDE\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D01-\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D57\\u0D5F-\\u0D63\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DE6-\\u0DEF\\u0DF2\\u0DF3\\u0E01-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDC-\\u0EDF\\u0F00\\u0F18\\u0F19\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F39\\u0F3E-\\u0F47\\u0F49-\\u0F6C\\u0F71-\\u0F84\\u0F86-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1380-\\u138F\\u13A0-\\u13F5\\u13F8-\\u13FD\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1714\\u1720-\\u1734\\u1740-\\u1753\\u1760-\\u176C\\u176E-\\u1770\\u1772\\u1773\\u1780-\\u17D3\\u17D7\\u17DC\\u17DD\\u17E0-\\u17E9\\u180B-\\u180D\\u1810-\\u1819\\u1820-\\u1877\\u1880-\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1920-\\u192B\\u1930-\\u193B\\u1946-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u19D0-\\u19D9\\u1A00-\\u1A1B\\u1A20-\\u1A5E\\u1A60-\\u1A7C\\u1A7F-\\u1A89\\u1A90-\\u1A99\\u1AA7\\u1AB0-\\u1ABD\\u1B00-\\u1B4B\\u1B50-\\u1B59\\u1B6B-\\u1B73\\u1B80-\\u1BF3\\u1C00-\\u1C37\\u1C40-\\u1C49\\u1C4D-\\u1C7D\\u1CD0-\\u1CD2\\u1CD4-\\u1CF6\\u1CF8\\u1CF9\\u1D00-\\u1DF5\\u1DFC-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u200C\\u200D\\u203F\\u2040\\u2054\\u2071\\u207F\\u2090-\\u209C\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D7F-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2DE0-\\u2DFF\\u2E2F\\u3005-\\u3007\\u3021-\\u302F\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u3099\\u309A\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA62B\\uA640-\\uA66F\\uA674-\\uA67D\\uA67F-\\uA6F1\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA7AD\\uA7B0-\\uA7B7\\uA7F7-\\uA827\\uA840-\\uA873\\uA880-\\uA8C4\\uA8D0-\\uA8D9\\uA8E0-\\uA8F7\\uA8FB\\uA8FD\\uA900-\\uA92D\\uA930-\\uA953\\uA960-\\uA97C\\uA980-\\uA9C0\\uA9CF-\\uA9D9\\uA9E0-\\uA9FE\\uAA00-\\uAA36\\uAA40-\\uAA4D\\uAA50-\\uAA59\\uAA60-\\uAA76\\uAA7A-\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEF\\uAAF2-\\uAAF6\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB65\\uAB70-\\uABEA\\uABEC\\uABED\\uABF0-\\uABF9\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE00-\\uFE0F\\uFE20-\\uFE2F\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF10-\\uFF19\\uFF21-\\uFF3A\\uFF3F\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC])*$/;
    regexES6ReservedWord = /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|await|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/;
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_valid_key_literal.js
function isValidKeyLiteral(value) {
  if (typeof value != "string") {
    return false;
  }
  if (value.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/)) {
    return true;
  }
  return isValidIdentifier(value);
}
var init_is_valid_key_literal = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_valid_key_literal.js"() {
    init_is_valid_identifier();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/to_representation.js
var reprSymbol, denoInspectSymbol, RegExpPrototype, BigIntPrototype, DatePrototype, ArrayPrototype, SetPrototype, MapPrototype, ObjectPrototype, ErrorPrototype, PromisePrototype, UrlPrototype, isProbablyAPrototype, representSymbol, reprKey, allGlobalKeysAtInit, toRepresentation;
var init_to_representation = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/to_representation.js"() {
    init_indent();
    init_typed_array_class();
    init_typed_array_classes();
    init_all_keys();
    init_is_valid_identifier();
    init_is_valid_key_literal();
    reprSymbol = Symbol.for("representation");
    denoInspectSymbol = Symbol.for("Deno.customInspect");
    RegExpPrototype = RegExp.prototype;
    BigIntPrototype = BigInt.prototype;
    DatePrototype = Date.prototype;
    ArrayPrototype = Array.prototype;
    SetPrototype = Set.prototype;
    MapPrototype = Map.prototype;
    ObjectPrototype = Object.prototype;
    ErrorPrototype = Error.prototype;
    PromisePrototype = Promise.prototype;
    UrlPrototype = globalThis.URL?.prototype;
    isProbablyAPrototype = (item) => typeof item?.constructor == "function" && item.constructor?.prototype == item && isValidIdentifier(item.constructor?.name);
    representSymbol = (item) => {
      if (!item.description) {
        return "Symbol()";
      } else {
        const description = item.description;
        let globalVersion = Symbol.for(description);
        if (globalVersion == item) {
          return \`Symbol.for(\${JSON.stringify(description)})\`;
        } else if (description.startsWith("Symbol.") && Symbol[description.slice(7)]) {
          return description;
        } else {
          return \`Symbol(\${JSON.stringify(description)})\`;
        }
      }
    };
    reprKey = (key2) => {
      if (typeof key2 == "symbol") {
        return \`[\${representSymbol(key2)}]\`;
      } else if (isValidKeyLiteral(key2)) {
        return key2;
      } else {
        return JSON.stringify(key2);
      }
    };
    allGlobalKeysAtInit = Object.freeze(allKeys(globalThis));
    toRepresentation = (item, { alreadySeen = /* @__PURE__ */ new Map(), debug = false, simplified, indent: indent2 = "    ", globalValues } = {}) => {
      if (Number.isFinite(indent2)) {
        indent2 = " ".repeat(indent2);
      }
      const options = { alreadySeen, debug, simplified, indent: indent2 };
      const recursionWrapper = (item2, options2) => {
        let groupIsOn = false;
        try {
          if (item2 === void 0) {
            return "undefined";
          } else if (item2 === null) {
            return "null";
          }
          const { alreadySeen: alreadySeen2, simplified: simplified2, indent: indent3 } = options2;
          if (item2 instanceof Object) {
            if (alreadySeen2.has(item2)) {
              const output2 = alreadySeen2.get(item2);
              if (output2 != null) {
                return output2;
              } else {
                return \`\${String(item2)} /*Self Reference*/\`;
              }
            } else {
              alreadySeen2.set(item2, null);
            }
          }
          const prototype = Object.getPrototypeOf(item2);
          if (typeof item2[reprSymbol] == "function") {
            try {
              const output2 = item2[reprSymbol](options2);
              alreadySeen2.set(item2, output2);
              return output2;
            } catch (error) {
              if (debug) {
                console.error(\`calling Symbol.for("representation") method failed (skipping)
Error was: \${error?.stack || error}\`);
              }
            }
          }
          if (typeof item2[denoInspectSymbol] == "function") {
            try {
              const output2 = item2[denoInspectSymbol](options2);
              alreadySeen2.set(item2, output2);
              return output2;
            } catch (error) {
              if (debug) {
                console.error(\`calling Symbol.for("Deno.customInspect") method failed (skipping)
Error was: \${error?.stack || error}\`);
              }
            }
          }
          if (debug) {
            console.group();
            groupIsOn = true;
          }
          let output;
          if (typeof item2 == "number" || typeof item2 == "boolean" || prototype == RegExpPrototype) {
            output = String(item2);
          } else if (typeof item2 == "string") {
            output = JSON.stringify(item2);
          } else if (typeof item2 == "symbol") {
            output = representSymbol(item2);
          } else if (prototype == BigIntPrototype) {
            output = \`BigInt(\${item2.toString()})\`;
          } else if (prototype == DatePrototype) {
            output = \`new Date(\${item2.getTime()})\`;
          } else if (prototype == ArrayPrototype) {
            output = arrayLikeRepr(item2, options2);
            let nonIndexKeys;
            try {
              nonIndexKeys = Object.keys(item2).filter((each) => !(Number.isInteger(each - 0) && each >= 0));
            } catch (error) {
              if (debug) {
                console.error(\`[toRepresentation] error checking nonIndexKeys
\${error?.stack || error}\`);
              }
            }
            if (nonIndexKeys.length > 0) {
              let extraKeys = {};
              for (const each of nonIndexKeys) {
                try {
                  extraKeys[each] = item2[each];
                } catch (error) {
                }
              }
              if (Object.keys(extraKeys).length > 0) {
                output = \`Object.assign(\${output}, \${pureObjectRepr(extraKeys)})\`;
              }
            }
          } else if (prototype == SetPrototype) {
            output = \`new Set(\${arrayLikeRepr(item2, options2)})\`;
          } else if (prototype == MapPrototype) {
            output = \`new Map(\${mapLikeObject(item2.entries(), options2)})\`;
          } else if (prototype == PromisePrototype) {
            output = \`Promise.resolve(/*unknown*/)\`;
          } else if (prototype == UrlPrototype) {
            output = \`new URL(\${JSON.stringify(item2?.href)})\`;
          } else if (isGlobalValue(item2)) {
            const key2 = globalValueMap.get(item2);
            if (isValidIdentifier(key2) || key2 == "eval") {
              output = key2;
            } else {
              if (typeof key2 == "symbol") {
                output = \`globalThis[\${representSymbol(key2)}]\`;
              } else if (isValidKeyLiteral(key2)) {
                output = \`globalThis.\${key2}\`;
              } else {
                output = \`globalThis[\${JSON.stringify(key2)}]\`;
              }
            }
          } else if (isProbablyAPrototype(item2)) {
            const name = item2.constructor.name;
            let isPrototypeOfGlobal;
            try {
              isPrototypeOfGlobal = globalThis[name]?.prototype == item2;
            } catch (error) {
            }
            if (isPrototypeOfGlobal) {
              output = \`\${name}.prototype\`;
            } else {
              if (simplified2) {
                output = \`\${name}.prototype /*\${name} is local*/\`;
              } else {
                output = \`/*prototype of \${name}*/ \${customObjectRepr(item2, options2)}\`;
              }
            }
          } else if (prototype == ErrorPrototype && item2?.constructor != globalThis.DOMException) {
            try {
              output = \`new Error(\${JSON.stringify(item2?.message)})\`;
            } catch (error) {
              output = \`new Error(\${JSON.stringify(item2)})\`;
            }
          } else if (typeof item2 == "function") {
            let isNativeCode;
            let asString;
            let isClass;
            const getAsString = () => {
              if (asString != null) {
                return asString;
              }
              try {
                asString = Function.prototype.toString.call(item2);
              } catch (error) {
              }
              return asString;
            };
            const getIsNativeCode = () => {
              if (isNativeCode != null) {
                return isNativeCode;
              }
              try {
                isNativeCode = !!getAsString().match(/{\\s*\\[native code\\]\\s*}$/);
              } catch (error) {
              }
              return isNativeCode;
            };
            const getIsClass = () => {
              if (isClass != null) {
                return isClass;
              }
              try {
                isClass = item2.name && getAsString().match(/^class\\b/);
              } catch (error) {
              }
              return isClass;
            };
            const name = item2.name;
            if (isValidIdentifier(name)) {
              if (getIsNativeCode()) {
                output = \`\${name} /*native function*/\`;
              } else if (getIsClass()) {
                if (simplified2) {
                  output = \`\${name} /*class*/\`;
                } else {
                  output = getAsString();
                }
              } else {
                if (simplified2) {
                  output = \`\${item2.name} /*function*/\`;
                } else {
                  output = \`(\${getAsString()})\`;
                }
              }
            } else if (getIsClass()) {
              if (typeof name == "string") {
                output = \`/*name: \${JSON.stringify(name)}*/ class { /*...*/ }\`;
              } else if (simplified2) {
                output = \`class { /*...*/ }\`;
              } else {
                output = getAsString();
              }
            } else if (typeof name == "string" && getAsString().match(/^(function )?(g|s)et\\b/)) {
              const realName = name.slice(4);
              if (name[0] == "g") {
                output = \`Object.getOwnPropertyDescriptor({/*unknown obj*/},\${JSON.stringify(realName)}).get\`;
              } else {
                output = \`Object.getOwnPropertyDescriptor({/*unknown obj*/},\${JSON.stringify(realName)}).set\`;
              }
            } else if (name) {
              if (simplified2) {
                if (getIsNativeCode()) {
                  if (name.startsWith("get ")) {
                    const realName = name.slice(4);
                    if (Object.getOwnPropertyDescriptor(globalThis, realName)?.get == item2) {
                      output = \`Object.getOwnPropertyDescriptor(globalThis, \${JSON.stringify(realName)}).get /*native getter*/\`;
                    } else {
                      output = \`Object.getOwnPropertyDescriptor({/*unknown obj*/}, \${JSON.stringify(realName)}).get\`;
                    }
                  } else if (name.startsWith("set ")) {
                    const realName = name.slice(4);
                    if (Object.getOwnPropertyDescriptor(globalThis, realName)?.set == item2) {
                      output = \`Object.getOwnPropertyDescriptor(globalThis, \${JSON.stringify(realName)}).set /*native setter*/\`;
                    } else {
                      output = \`Object.getOwnPropertyDescriptor({/*unknown obj*/}, \${JSON.stringify(realName)}).set\`;
                    }
                  } else {
                    output = \`(function(){/*name: \${recursionWrapper(name, options2)}, native function*/}})\`;
                  }
                } else {
                  output = \`(function(){/*name: \${recursionWrapper(name, options2)}*/}})\`;
                }
              } else {
                output = \`/*name: \${recursionWrapper(name, options2)}*/ (\${getAsString()})\`;
              }
            } else {
              if (simplified2) {
                if (getIsNativeCode()) {
                  output = \`(function(){/*native function*/}})\`;
                } else {
                  output = \`(function(){/*...*/}})\`;
                }
              } else {
                output = \`(\${getAsString()})\`;
              }
            }
          } else {
            output = customObjectRepr(item2, options2);
          }
          if (groupIsOn) {
            console.groupEnd();
          }
          alreadySeen2.set(item2, output);
          return output;
        } catch (error) {
          if (groupIsOn) {
            console.groupEnd();
          }
          if (debug) {
            console.debug(\`[toRepresentation] error is: \${error}\`, error?.stack || error);
          }
          try {
            return String(item2);
          } catch (error2) {
            return "{} /*error: catestrophic representation failure*/";
          }
        }
      };
      let globalValueMap;
      const isGlobalValue = (item2) => {
        if (globalValueMap == null) {
          globalValueMap = globalValueMap || new Map(allGlobalKeysAtInit.filter((each) => {
            try {
              globalThis[each];
            } catch (error) {
              return false;
            }
            return true;
          }).map((each) => [globalThis[each], each]));
          for (const [key2, value] of Object.entries(globalValues || {})) {
            globalValueMap.set(key2, value);
          }
        }
        return globalValueMap.has(item2);
      };
      const pureObjectRepr = (item2) => {
        if (options.simplified == null) {
          options.simplified = true;
        }
        let string = "{";
        let propertyDescriptors;
        try {
          propertyDescriptors = Object.entries(Object.getOwnPropertyDescriptors(item2));
        } catch (error) {
          if (debug) {
            console.error(\`[toRepresentation] error getting Object.propertyDescriptor
\${error?.stack || error}\`);
          }
          try {
            return String(item2);
          } catch (error2) {
            return "undefined /*error: catestrophic representation failure*/";
          }
        }
        for (const [key2, { value, writable, enumerable, configurable, get, set }] of propertyDescriptors) {
          const stringKey = reprKey(key2);
          if (get) {
            string += \`
\${indent2}get \${stringKey}(){/*contents*/}\`;
          } else {
            string += \`
\${indent2}\${stringKey}: \${indent({ string: recursionWrapper(value, options), by: options.indent, noLead: true })},\`;
          }
        }
        if (propertyDescriptors.length == 0) {
          string += "}";
        } else {
          string += "\\n}";
        }
        return string;
      };
      const arrayLikeRepr = (item2, options2) => {
        if (options2.simplified == null) {
          options2.simplified = true;
        }
        const chunks = [];
        let oneHasNewLine = false;
        for (const each of item2) {
          const repr = recursionWrapper(each, options2);
          chunks.push(repr);
          if (!oneHasNewLine && repr.includes("\\n")) {
            oneHasNewLine = true;
          }
        }
        if (!oneHasNewLine) {
          return \`[\${chunks.join(",")}]\`;
        } else {
          return \`[
\${chunks.map((each) => indent({ string: each, by: options2.indent, noLead: false })).join(",\\n")}
]\`;
        }
      };
      const mapLikeObject = (entries, options2) => {
        let string = "";
        for (const [key2, value] of entries) {
          if (options2.simplified == null) {
            options2.simplified = true;
          }
          const stringKey = recursionWrapper(key2, options2);
          const stringValue = recursionWrapper(value, options2);
          if (!stringKey.includes("\\n")) {
            const formattedValue = stringValue.includes("\\n") ? indent({ string: stringValue, by: options2.indent, noLead: true }) : indent({ string: stringValue, by: options2.indent, noLead: true });
            string += \`
\${options2.indent}[\${stringKey}, \${formattedValue}],\`;
          } else {
            const doubleIndent = options2.indent + options2.indent;
            string += \`
\${options2.indent}[
\${indent({ string: stringKey, by: doubleIndent, noLead: false })},
\${indent({ string: stringValue, by: doubleIndent, noLead: false })}
\${options2.indent}],\`;
          }
        }
        if (string.length == 0) {
          return "";
        } else {
          return \`[\${string}
]\`;
        }
      };
      const customObjectRepr = (item2, options2) => {
        const prototype = Object.getPrototypeOf(item2);
        if (prototype == ObjectPrototype) {
          return pureObjectRepr(item2);
        }
        let className = prototype.constructor?.name;
        let output;
        if (typeof className != "string" || className == "Object" || className == "Function") {
          className = null;
        }
        const vanillaCustomObjRepr = () => {
          if (className) {
            if (options2.simplified) {
              return \`new \${className}(/*...*/)\`;
            } else {
              return \`new \${className}(\${pureObjectRepr(item2)})\`;
            }
          } else {
            return pureObjectRepr(item2);
          }
        };
        if (item2 instanceof Array || item2 instanceof TypedArray || item2 instanceof Set) {
          let isAllIndexKeys;
          try {
            isAllIndexKeys = Object.keys(item2).every((each) => Number.isInteger(each - 0) && each >= 0);
          } catch (error) {
            if (debug) {
              console.error(\`[toRepresentation] error checking isAllIndexKeys
\${error?.stack || error}\`);
            }
          }
          let arrayLikeReprString;
          if (isAllIndexKeys) {
            try {
              arrayLikeReprString = arrayLikeRepr(item2, options2);
            } catch (error) {
              isAllIndexKeys = false;
            }
          }
          if (isAllIndexKeys) {
            if (className) {
              output = \`new \${className}(\${arrayLikeReprString})\`;
            } else {
              if (item2 instanceof Array) {
                output = arrayLikeReprString;
              } else if (item2 instanceof TypedArray) {
                for (const each of typedArrayClasses) {
                  if (item2 instanceof each) {
                    output = \`new \${each.name}(\${arrayLikeReprString})\`;
                    break;
                  }
                }
              } else if (item2 instanceof Set) {
                output = \`new Set(\${arrayLikeReprString})\`;
              }
            }
          } else {
            output = vanillaCustomObjRepr(item2);
          }
        } else if (item2 instanceof Map) {
          if (className && options2.simplified) {
            output = \`new \${className}(/*...*/)\`;
          } else {
            let entries = [];
            try {
              entries = Map.prototype.entries.call(item2);
            } catch (error) {
              if (debug) {
                console.error(\`[toRepresentation] error getting Map.prototype.entries
\${error?.stack || error}\`);
              }
            }
            const core = mapLikeObject(entries, options2);
            if (className) {
              output = \`new \${className}(\${core})\`;
            } else {
              output = \`new Map(\${core})\`;
            }
          }
        } else {
          try {
            output = vanillaCustomObjRepr(item2);
          } catch (error) {
            try {
              output = pureObjectRepr(item2);
            } catch (error2) {
              try {
                output = item2.toString();
              } catch (error3) {
                return "undefined /*error: catestrophic representation failure*/";
              }
            }
          }
        }
        return output;
      };
      try {
        const output = recursionWrapper(item, options);
        return output;
      } catch (error) {
        if (debug) {
          console.debug(\`[toRepresentation] error is:\`, error);
        }
        return String(item);
      }
    };
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/to_string.js
var toString;
var init_to_string = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/to_string.js"() {
    init_to_representation();
    toString = (value) => {
      if (typeof value == "symbol") {
        return toRepresentation(value);
      } else if (!(value instanceof Object)) {
        return value != null ? value.toString() : \`\${value}\`;
      } else {
        return toRepresentation(value);
      }
    };
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/digits_to_english_array.js
var init_digits_to_english_array = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/digits_to_english_array.js"() {
    init_to_string();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/word_list.js
var init_word_list = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/word_list.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/to_pascal_case.js
var init_to_pascal_case = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/to_pascal_case.js"() {
    init_word_list();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/to_kebab_case.js
var init_to_kebab_case = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/to_kebab_case.js"() {
    init_word_list();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/to_snake_case.js
var init_to_snake_case = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/to_snake_case.js"() {
    init_word_list();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/to_camel_case.js
var init_to_camel_case = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/to_camel_case.js"() {
    init_word_list();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/to_screaming_kebab_case.js
var init_to_screaming_kebab_case = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/to_screaming_kebab_case.js"() {
    init_word_list();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/to_screaming_snake_case.js
var init_to_screaming_snake_case = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/to_screaming_snake_case.js"() {
    init_word_list();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/find_all.js
var init_find_all = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/find_all.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/extract_first.js
var init_extract_first = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/extract_first.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/iteratively_find_all.js
var init_iteratively_find_all = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/iteratively_find_all.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/escape_js_string.js
var init_escape_js_string = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/escape_js_string.js"() {
    init_is_valid_identifier();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/escape_regex_replace.js
var init_escape_regex_replace = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/escape_regex_replace.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/escape_regex_match.js
function escapeRegexMatch(str) {
  return str.replaceAll(
    RX_REGEXP_ESCAPE,
    (m) => reservedCharMap[m]
  );
}
var reservedCharMap, RX_REGEXP_ESCAPE;
var init_escape_regex_match = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/escape_regex_match.js"() {
    reservedCharMap = {
      "&": "\\\\x26",
      "!": "\\\\x21",
      "#": "\\\\x23",
      "$": "\\\\$",
      "%": "\\\\x25",
      "*": "\\\\*",
      "+": "\\\\+",
      ",": "\\\\x2c",
      ".": "\\\\.",
      ":": "\\\\x3a",
      ";": "\\\\x3b",
      "<": "\\\\x3c",
      "=": "\\\\x3d",
      ">": "\\\\x3e",
      "?": "\\\\?",
      "@": "\\\\x40",
      "^": "\\\\^",
      "\`": "\\\\x60",
      "~": "\\\\x7e",
      "(": "\\\\(",
      ")": "\\\\)",
      "[": "\\\\[",
      "]": "\\\\]",
      "{": "\\\\{",
      "}": "\\\\}",
      "/": "\\\\/",
      "-": "\\\\x2d",
      "\\\\": "\\\\\\\\",
      "|": "\\\\|"
    };
    RX_REGEXP_ESCAPE = new RegExp(
      \`[\${Object.values(reservedCharMap).join("")}]\`,
      "gu"
    );
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/regex.js
function regexWithStripWarning(shouldStrip) {
  return (strings, ...values) => {
    let newRegexString = "";
    for (const [string, value] of iterZipLongSync(strings, values)) {
      newRegexString += string;
      if (value instanceof RegExp) {
        if (!shouldStrip && value.flags.replace(/g/, "").length > 0) {
          console.warn(\`Warning: flags inside of regex:
    The RegExp trigging this warning is: \${value}
    When calling the regex interpolater (e.g. regex\\\`something\\\${stuff}\\\`)
    one of the \\\${} values (the one above) was a RegExp with a flag enabled
    e.g. /stuff/i  <- i = ignoreCase flag enabled
    When the /stuff/i gets interpolated, its going to loose its flags
    (thats what I'm warning you about)
    
    To disable/ignore this warning do:
        regex.stripFlags\\\`something\\\${/stuff/i}\\\`
    If you want to add flags to the output of regex\\\`something\\\${stuff}\\\` do:
        regex\\\`something\\\${stuff}\\\`.i   // ignoreCase
        regex\\\`something\\\${stuff}\\\`.ig  // ignoreCase and global
        regex\\\`something\\\${stuff}\\\`.gi  // functionally equivlent
\`);
        }
        newRegexString += \`(?:\${value.source})\`;
      } else if (value != null) {
        newRegexString += escapeRegexMatch(toString(value));
      }
    }
    return proxyRegExp(newRegexString, "");
  };
}
var regexpProxy, realExec, proxyRegExp, regexProxyOptions, regex;
var init_regex = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/regex.js"() {
    init_escape_regex_match();
    init_zip_long();
    init_to_string();
    regexpProxy = Symbol("regexpProxy");
    realExec = RegExp.prototype.exec;
    RegExp.prototype.exec = function(...args) {
      if (this[regexpProxy]) {
        return realExec.apply(this[regexpProxy], args);
      }
      return realExec.apply(this, args);
    };
    regexProxyOptions = Object.freeze({
      get(original, key2) {
        if (typeof key2 == "string" && key2.match(/^[igmusyv]+$/)) {
          return proxyRegExp(original, key2);
        }
        if (key2 == regexpProxy) {
          return original;
        }
        return original[key2];
      },
      set(original, key2, value) {
        original[key2] = value;
        return true;
      }
    });
    proxyRegExp = (parent, flags) => {
      const regex2 = new RegExp(parent, flags);
      const output = new Proxy(regex2, regexProxyOptions);
      Object.setPrototypeOf(output, Object.getPrototypeOf(regex2));
      return output;
    };
    regex = regexWithStripWarning(false);
    regex.stripFlags = regexWithStripWarning(true);
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/levenshtein_distance_between.js
var init_levenshtein_distance_between = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/levenshtein_distance_between.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/levenshtein_distance_ordering.js
var init_levenshtein_distance_ordering = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/levenshtein_distance_ordering.js"() {
    init_levenshtein_distance_between();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/did_you_mean.js
var init_did_you_mean = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/did_you_mean.js"() {
    init_levenshtein_distance_between();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/utf8_bytes_to_string.js
var textDecoder, utf8BytesToString;
var init_utf8_bytes_to_string = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/utf8_bytes_to_string.js"() {
    textDecoder = new TextDecoder("utf-8");
    utf8BytesToString = textDecoder.decode.bind(textDecoder);
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/string_to_utf8_bytes.js
var textEncoder, stringToUtf8Bytes;
var init_string_to_utf8_bytes = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/string_to_utf8_bytes.js"() {
    textEncoder = new TextEncoder("utf-8");
    stringToUtf8Bytes = textEncoder.encode.bind(textEncoder);
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/all_equal.js
var init_all_equal = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/all_equal.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/common_prefix.js
var init_common_prefix = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/common_prefix.js"() {
    init_all_equal();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/remove_common_prefix.js
var init_remove_common_prefix = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/remove_common_prefix.js"() {
    init_common_prefix();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/common_suffix.js
var init_common_suffix = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/common_suffix.js"() {
    init_all_equal();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/remove_common_suffix.js
var init_remove_common_suffix = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/remove_common_suffix.js"() {
    init_common_suffix();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/common_prefix_removed.js
var init_common_prefix_removed = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/common_prefix_removed.js"() {
    init_remove_common_prefix();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/common_suffix_removed.js
var init_common_suffix_removed = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/common_suffix_removed.js"() {
    init_remove_common_suffix();
  }
});

// https://deno.land/x/good@1.13.2.0/string.js
var init_string = __esm({
  "https://deno.land/x/good@1.13.2.0/string.js"() {
    init_zip_long();
    init_capitalize();
    init_indent();
    init_to_representation();
    init_to_string();
    init_digits_to_english_array();
    init_to_pascal_case();
    init_to_kebab_case();
    init_to_snake_case();
    init_to_camel_case();
    init_to_screaming_kebab_case();
    init_to_screaming_snake_case();
    init_find_all();
    init_extract_first();
    init_iteratively_find_all();
    init_escape_js_string();
    init_escape_regex_replace();
    init_escape_regex_match();
    init_regex();
    init_levenshtein_distance_between();
    init_levenshtein_distance_ordering();
    init_did_you_mean();
    init_utf8_bytes_to_string();
    init_string_to_utf8_bytes();
    init_is_valid_identifier();
    init_remove_common_prefix();
    init_remove_common_suffix();
    init_common_prefix_removed();
    init_common_suffix_removed();
    init_common_prefix();
    init_common_suffix();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/built_in_copyable_primitive_classes.js
var builtInCopyablePrimitiveClasses;
var init_built_in_copyable_primitive_classes = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/built_in_copyable_primitive_classes.js"() {
    init_typed_array_classes();
    builtInCopyablePrimitiveClasses = /* @__PURE__ */ new Set([RegExp, Date, URL, ...typedArrayClasses, globalThis.ArrayBuffer, globalThis.DataView]);
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/sync_iterator_prototype.js
var syncIteratorPrototype;
var init_sync_iterator_prototype = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/sync_iterator_prototype.js"() {
    syncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/array_iterator__class.js
var ArrayIterator;
var init_array_iterator_class = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/array_iterator__class.js"() {
    ArrayIterator = Object.getPrototypeOf([][Symbol.iterator]);
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/map_iterator__class.js
var MapIterator;
var init_map_iterator_class = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/map_iterator__class.js"() {
    MapIterator = Object.getPrototypeOf((/* @__PURE__ */ new Map())[Symbol.iterator]);
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/set_iterator__class.js
var SetIterator;
var init_set_iterator_class = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/set_iterator__class.js"() {
    SetIterator = Object.getPrototypeOf((/* @__PURE__ */ new Set())[Symbol.iterator]);
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/async_function__class.js
var AsyncFunction;
var init_async_function_class = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/async_function__class.js"() {
    AsyncFunction = class {
    };
    try {
      AsyncFunction = eval("(async function(){}).constructor");
    } catch (err2) {
    }
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/sync_generator_function__class.js
var SyncGeneratorFunction;
var init_sync_generator_function_class = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/sync_generator_function__class.js"() {
    SyncGeneratorFunction = class {
    };
    try {
      SyncGeneratorFunction = eval("(function*(){}).constructor");
    } catch (err2) {
    }
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/async_generator_function__class.js
var AsyncGeneratorFunction;
var init_async_generator_function_class = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/async_generator_function__class.js"() {
    AsyncGeneratorFunction = class {
    };
    try {
      AsyncGeneratorFunction = eval("(async function*(){}).constructor");
    } catch (err2) {
    }
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/sync_generator_object__class.js
var SyncGeneratorObject;
var init_sync_generator_object_class = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/sync_generator_object__class.js"() {
    SyncGeneratorObject = class {
    };
    try {
      SyncGeneratorObject = eval("((function*(){})()).constructor");
    } catch (err2) {
    }
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/async_generator_object__class.js
var AsyncGeneratorObject;
var init_async_generator_object_class = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/async_generator_object__class.js"() {
    AsyncGeneratorObject = class {
    };
    try {
      AsyncGeneratorObject = eval("((async function*(){})()).constructor");
    } catch (err2) {
    }
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_primitive.js
var init_is_primitive = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_primitive.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_pure_object.js
var init_is_pure_object = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_pure_object.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_practically_primitive.js
var init_is_practically_primitive = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_practically_primitive.js"() {
    init_is_primitive();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_built_in_sync_iterator.js
var isBuiltInSyncIterator;
var init_is_built_in_sync_iterator = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_built_in_sync_iterator.js"() {
    init_sync_iterator_prototype();
    isBuiltInSyncIterator = syncIteratorPrototype.isPrototypeOf.bind(syncIteratorPrototype);
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_iterator.js
var init_is_iterator = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_iterator.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_iterable_technically.js
var init_is_iterable_technically = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_iterable_technically.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_generator_object.js
var init_is_generator_object = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_generator_object.js"() {
    init_is_iterator();
    init_is_iterable_technically();
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_async_iterable.js
var init_is_async_iterable = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_async_iterable.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_sync_iterable.js
var init_is_sync_iterable = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_sync_iterable.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_iterable_object_or_container.js
var init_is_iterable_object_or_container = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_iterable_object_or_container.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/is_sync_iterable_object_or_container.js
var init_is_sync_iterable_object_or_container = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/is_sync_iterable_object_or_container.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/deep_copy_symbol.js
var deepCopySymbol;
var init_deep_copy_symbol = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/deep_copy_symbol.js"() {
    deepCopySymbol = Symbol.for("deepCopy");
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/deep_copy.js
var clonedFromSymbol, getThis;
var init_deep_copy = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/deep_copy.js"() {
    init_deep_copy_symbol();
    init_is_generator_object();
    init_built_in_copyable_primitive_classes();
    clonedFromSymbol = Symbol();
    getThis = Symbol();
    Object.getPrototypeOf(function() {
    })[getThis] = function() {
      return this;
    };
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/shallow_sort_object.js
var init_shallow_sort_object = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/shallow_sort_object.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/deep_sort_object.js
var init_deep_sort_object = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/deep_sort_object.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/stable_stringify.js
var init_stable_stringify = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/stable_stringify.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/all_key_descriptions.js
var allKeyDescriptions;
var init_all_key_descriptions = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/all_key_descriptions.js"() {
    allKeyDescriptions = function(value, options = { includingBuiltin: false }) {
      var { includingBuiltin } = { ...options };
      let descriptions = [];
      if (value == null) {
        return {};
      }
      if (!(value instanceof Object)) {
        value = Object.getPrototypeOf(value);
      }
      const rootPrototype = Object.getPrototypeOf({});
      let prevObj;
      while (value && value != prevObj) {
        if (!includingBuiltin && value == rootPrototype) {
          break;
        }
        descriptions = descriptions.concat(Object.entries(Object.getOwnPropertyDescriptors(value)));
        prevObj = value;
        value = Object.getPrototypeOf(value);
      }
      descriptions.reverse();
      return Object.fromEntries(descriptions);
    };
  }
});

// https://deno.land/x/good@1.13.2.0/flattened/own_key_descriptions.js
var init_own_key_descriptions = __esm({
  "https://deno.land/x/good@1.13.2.0/flattened/own_key_descriptions.js"() {
  }
});

// https://deno.land/x/good@1.13.2.0/value.js
var init_value = __esm({
  "https://deno.land/x/good@1.13.2.0/value.js"() {
    init_typed_array_classes();
    init_built_in_copyable_primitive_classes();
    init_sync_iterator_prototype();
    init_array_iterator_class();
    init_map_iterator_class();
    init_set_iterator_class();
    init_async_function_class();
    init_sync_generator_function_class();
    init_async_generator_function_class();
    init_sync_generator_object_class();
    init_async_generator_object_class();
    init_is_primitive();
    init_is_pure_object();
    init_is_practically_primitive();
    init_is_built_in_sync_iterator();
    init_is_generator_object();
    init_is_async_iterable();
    init_is_sync_iterable();
    init_is_iterable_object_or_container();
    init_is_iterable_technically();
    init_is_sync_iterable_object_or_container();
    init_deep_copy_symbol();
    init_deep_copy();
    init_shallow_sort_object();
    init_deep_sort_object();
    init_stable_stringify();
    init_all_keys();
    init_all_key_descriptions();
    init_own_key_descriptions();
  }
});

// https://esm.sh/gh/jeff-hykin/elemental@0.6.5/denonext/main/deno.development.mjs
function htm(statics) {
  let h = this, prev = 0, current = [null], field = 0, args, name, value, quotes = [], quote = 0, last, level = 0, pre = false;
  const evaluate = (str2, parts = [], raw) => {
    let i = 0;
    str2 = !raw && str2 === QUOTES ? quotes[quote++].slice(1, -1) : str2.replace(/\\ue001/g, (m) => quotes[quote++]);
    if (!str2) return str2;
    str2.replace(/\\ue000/g, (match, idx) => {
      if (idx) parts.push(str2.slice(i, idx));
      i = idx + 1;
      return parts.push(arguments[++field]);
    });
    if (i < str2.length) parts.push(str2.slice(i));
    return parts.length > 1 ? parts : parts[0];
  };
  const up = () => {
    ;
    [current, last, ...args] = current;
    current.push(h(last, ...args));
    if (pre === level--) pre = false;
  };
  let str = statics.join(FIELD).replace(/<!--[^]*?-->/g, "").replace(/<!\\[CDATA\\[[^]*\\]\\]>/g, "").replace(/('|")[^\\1]*?\\1/g, (match) => (quotes.push(match), QUOTES));
  str.replace(/(?:^|>)((?:[^<]|<[^\\w\\ue000\\/?!>])*)(?:$|<)/g, (match, text, idx, str2) => {
    let tag, close2;
    if (idx) {
      str2.slice(prev, idx).replace(/(\\S)\\/$/, "$1 /").split(/\\s+/).map((part, i) => {
        if (part[0] === "/") {
          part = part.slice(1);
          if (EMPTY[part]) return;
          close2 = tag || part || 1;
        } else if (!i) {
          tag = evaluate(part);
          if (typeof tag === "string") {
            while (CLOSE[current[1] + tag]) up();
          }
          current = [current, tag, null];
          level++;
          if (!pre && PRE[tag]) pre = level;
          if (EMPTY[tag]) close2 = tag;
        } else if (part) {
          let props = current[2] || (current[2] = {});
          if (part.slice(0, 3) === "...") {
            Object.assign(props, arguments[++field]);
          } else {
            ;
            [name, value] = part.split("=");
            Array.isArray(value = props[evaluate(name)] = value ? evaluate(value) : true) && // if prop value is array - make sure it serializes as string without csv
            (value.toString = value.join.bind(value, ""));
          }
        }
      });
    }
    if (close2) {
      if (!current[0]) err(\`Wrong close tag \\\`\${close2}\\\`\`);
      up();
      while (last !== close2 && CLOSE[last]) up();
    }
    prev = idx + match.length;
    if (!pre) text = text.replace(/\\s*\\n\\s*/g, "").replace(/\\s+/g, " ");
    if (text) evaluate((last = 0, text), current, true);
  });
  if (current[0] && CLOSE[current[1]]) up();
  if (level) err(\`Unclosed \\\`\${current[1]}\\\`.\`);
  return current.length < 3 ? current[1] : (current.shift(), current);
}
function createErrorElement(error) {
  const element = document.createElement("div");
  element.setAttribute("style", \`
        all:              unset;
        display:          flex;
        flex-direction:   column;
        padding:          1.5rem;
        background-color: #f5a5a8;
        color:            white;
        font-family:      -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        font-size:        18px;
        font-weight:      400;
        overflow:         auto;
    \`);
  element.innerHTML = \`I'm sorry, there was an error when loading this part of the page \\u{1F641}.<br>Here's the error message: \${Option(toString(error != null && error.message || error)).innerHTML}\`;
}
function defaultErrorComponentFactory({ children, ...properties2 }, key2, error) {
  const element = document.createElement("div");
  const errorDetails = document.createElement("div");
  const childContainer = document.createElement("div");
  element.setAttribute("style", \`
        all:              unset;
        display:          flex;
        flex-direction:   column;
        padding:          1.5rem;
        background-color: #f5a5a8;
        color:            white;
        font-family:      -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        font-size:        18px;
        font-weight:      400;
        overflow:         auto;
    \`);
  element.innerHTML = \`I'm sorry, there was an error when loading this part of the page \\u{1F641} \`;
  let errorElementPart;
  if (typeof key2 == "string") {
    errorElementPart = \`&lt;\${key2} />\`;
  } else {
    try {
      errorElementPart = \`&lt;\${key2.prototype.constructor.name} />\`;
    } catch (error2) {
      try {
        errorElementPart = \`&lt;\${key2.name} />\`;
      } catch (error3) {
        errorElementPart = \`&lt;\${key2} />\`;
      }
    }
  }
  let errorJsonObject = {};
  for (const [key3, value] of Object.entries(properties2)) {
    try {
      errorJsonObject[key3] = JSON.parse(JSON.stringify(value));
    } catch (error2) {
      if (typeof value == "symbol") {
        errorJsonObject[key3] = value.toString();
      } else {
        errorJsonObject[key3] = \`\${value}\`;
      }
    }
  }
  errorDetails.innerHTML = \`<span>error: \${\`\${error}\`.replace(/\\n/, "<br>")}<br>location:<br>\${indent({ string: error.stack, by: "    " }).replace(/\\n/, "<br>")}</span><br><span>tag: \${errorElementPart}</span><br><div>properties:<br><code style="max-height: 12rem; overflow: auto;">\${JSON.stringify(errorJsonObject, 0, 4)}</code></div>\`;
  errorDetails.setAttribute("style", \`
        padding: 1rem;
        background-color: #161b22;
        color: #789896;
        white-space: pre;
        max-width: 85vw;
        overflow: auto;
    \`);
  element.appendChild(errorDetails);
  childContainer.setAttribute("style", \`
        all: unset
        display: flex
        flex-direction: column
        margin-top: 1.3rem
    \`);
  for (const each of children || []) {
    try {
      ElementalClass.appendChildren(childContainer, [each]);
    } catch (error2) {
    }
  }
  element.appendChild(childContainer);
  return element;
}
var FIELD, QUOTES, err, EMPTY, CLOSE, PRE, close, xhtm, validStyleAttribute, validNonCallbackHtmlAttributes, isValidStyleAttribute, kebabCase, isConstructor, attachProperties, toHtmlElement, ElementalClass, Elemental, passAlongProps, combineClasses, html, css, allTags, deno_default;
var init_deno_development = __esm({
  "https://esm.sh/gh/jeff-hykin/elemental@0.6.5/denonext/main/deno.development.mjs"() {
    init_string();
    init_value();
    FIELD = "\\uE000";
    QUOTES = "\\uE001";
    err = (msg) => {
      throw SyntaxError(msg);
    };
    EMPTY = htm.empty = {};
    CLOSE = htm.close = {};
    PRE = htm.pre = {};
    "area base basefont bgsound br col command embed frame hr image img input keygen link meta param source track wbr ! !doctype ? ?xml".split(" ").map((v) => htm.empty[v] = true);
    close = {
      li: "",
      dt: "dd",
      dd: "dt",
      p: "address article aside blockquote details div dl fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol pre section table",
      rt: "rp",
      rp: "rt",
      optgroup: "",
      option: "optgroup",
      caption: "tbody thead tfoot tr colgroup",
      colgroup: "thead tbody tfoot tr caption",
      thead: "tbody tfoot caption",
      tbody: "tfoot caption",
      tfoot: "caption",
      tr: "tbody tfoot",
      td: "th tr",
      th: "td tr tbody"
    };
    for (let tag in close) {
      for (let closer of [...close[tag].split(" "), tag]) htm.close[tag] = htm.close[tag + closer] = true;
    }
    "pre textarea".split(" ").map((v) => htm.pre[v] = true);
    xhtm = htm;
    validStyleAttribute = Object.freeze(/* @__PURE__ */ new Set(["accent-color", "align-content", "align-items", "align-self", "align-tracks", "all", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timeline", "animation-timing-function", "appearance", "ascent-override", "aspect-ratio", "backdrop-filter", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "bleed", "block-overflow", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-end-end-radius", "border-end-start-radius", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-start-end-radius", "border-start-start-radius", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "color", "color-scheme", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "content-visibility", "counter-increment", "counter-reset", "counter-set", "cursor", "length", "angle", "descent-override", "direction", "display", "resolution", "empty-cells", "fallback", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "flex_value", "float", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "forced-color-adjust", "gap", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "frequency", "hanging-punctuation", "height", "hyphenate-character", "hyphens", "image-orientation", "image-rendering", "image-resolution", "inherit", "inherits", "initial", "initial-letter", "initial-letter-align", "initial-value", "inline-size", "input-security", "inset", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "isolation", "justify-content", "justify-items", "justify-self", "justify-tracks", "left", "letter-spacing", "line-break", "line-clamp", "line-gap-override", "line-height", "line-height-step", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "margin-trim", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "masonry-auto-flow", "math-style", "max-block-size", "max-height", "max-inline-size", "max-lines", "max-width", "max-zoom", "min-block-size", "min-height", "min-inline-size", "min-width", "min-zoom", "mix-blend-mode", "time", "negative", "object-fit", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "orientation", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-anchor", "overflow-block", "overflow-clip-margin", "overflow-inline", "overflow-wrap", "overflow-x", "overflow-y", "overscroll-behavior", "overscroll-behavior-block", "overscroll-behavior-inline", "overscroll-behavior-x", "overscroll-behavior-y", "Pseudo-classes", "Pseudo-elements", "pad", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "paint-order", "perspective", "perspective-origin", "place-content", "place-items", "place-self", "pointer-events", "position", "prefix", "print-color-adjust", "quotes", "range", "resize", "revert", "right", "rotate", "row-gap", "ruby-align", "ruby-merge", "ruby-position", "scale", "scroll-behavior", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "size", "size-adjust", "speak-as", "src", "suffix", "symbols", "syntax", "system", "tab-size", "table-layout", "text-align", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-skip-ink", "text-decoration-style", "text-decoration-thickness", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-size-adjust", "text-transform", "text-underline-offset", "text-underline-position", "top", "touch-action", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "translate", "unicode-bidi", "unicode-range", "unset", "user-select", "user-zoom", "vertical-align", "viewport-fit", "visibility", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index", "zoom"]));
    validNonCallbackHtmlAttributes = Object.freeze(/* @__PURE__ */ new Set(["class", "style", "value", "id", "contenteditable", "href", "hidden", "autofocus", "src", "name", "accept", "accesskey", "action", "align", "alt", "async", "autocomplete", "autoplay", "border", "charset", "checked", "cite", "cols", "colspan", "content", "controls", "coords", "data", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "enctype", "for", "form", "formaction", "headers", "high", "hreflang", "http", "ismap", "kind", "label", "lang", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "multiple", "muted", "novalidate", "open", "optimum", "pattern", "placeholder", "poster", "preload", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "selected", "shape", "size", "sizes", "span", "spellcheck", "srcdoc", "srclang", "srcset", "start", "step", "tabindex", "target", "title", "translate", "type", "usemap", "wrap", "bgcolor", "width", "color", "height"]));
    isValidStyleAttribute = (key2) => key2.startsWith("-") || validStyleAttribute.has(key2);
    kebabCase = (string) => string.replace(/[a-z]([A-Z])(?=[a-z])/g, (each) => \`\${each[0]}-\${each.slice(1).toLowerCase()}\`);
    isConstructor = (obj) => !!obj.prototype && !!obj.prototype.constructor.name;
    attachProperties = (source, target) => {
      const attributes = allKeyDescriptions(source);
      const propertiesDefition = {};
      for (const [key2, value] of Object.entries(attributes)) {
        if (["constructor", "prototype", "length"].includes(key2)) {
          continue;
        }
        propertiesDefition[key2] = {
          get: () => source[key2]
        };
      }
      Object.defineProperties(target, propertiesDefition);
      return target;
    };
    toHtmlElement = Symbol.for("toHtmlElement");
    ElementalClass = class _ElementalClass {
      constructor(components = {}, options = {}) {
        const { middleware, errorComponentFactory, defaultPlaceholderFactory } = options || {};
        this.components = components || {};
        this.middleware = middleware || {};
        this.defaultPlaceholderFactory = defaultPlaceholderFactory || (() => document.createElement("div"));
        this.errorComponentFactory = errorComponentFactory || defaultErrorComponentFactory;
        this.html = this.createElement.bind(this);
        this.xhtm = xhtm.bind((...args) => this.createElement(...args));
      }
      static debug = false;
      static allTags = Symbol.for("allTags");
      static exclusivelySvgElements = /* @__PURE__ */ new Set(["svg", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "hatch", "hatchpath", "image", "line", "linearGradient", "marker", "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "switch", "symbol", "text", "textPath", "tspan", "unknown", "use", "view"]);
      static randomId = (name) => \`\${name}\${Math.random()}\`.replace(".", "");
      static makeHtmlElement = function(element) {
        if (element instanceof Node || element instanceof Element || element instanceof HTMLDocument) {
          return element;
        } else {
          if (element == null) {
            return new globalThis.Text("");
          } else if (typeof element == "string") {
            return new globalThis.Text(element);
          } else if (typeof element == "symbol") {
            return new globalThis.Text(element.toString());
          } else if (!(element instanceof Object)) {
            return new globalThis.Text(\`\${element}\`);
          } else if (element[toHtmlElement] != null) {
            return _ElementalClass.makeHtmlElement(element[toHtmlElement]);
          } else {
            let className;
            try {
              className = Object.getPrototypeOf(element).constructor.name;
              className = className && \`class \${JSON.stringify(className)}\`;
            } catch (error) {
            }
            throw Error(\`Cannot coerce \${className || element} into an html element
\`, element);
          }
        }
      };
      static appendChildren = function(element, ...children) {
        const { element: altElement, insertBefore } = element;
        let primitiveAppend = (child) => element.appendChild(child);
        if (insertBefore && !(insertBefore instanceof Function)) {
          element = altElement;
          primitiveAppend = (child) => element.insertBefore(insertBefore, child);
        }
        for (const each of children) {
          if (each instanceof Array) {
            _ElementalClass.appendChildren(element, ...each);
          } else if (each instanceof Function) {
            _ElementalClass.appendChildren(element, each());
          } else if (each instanceof Promise) {
            const elementPromise = each;
            const placeholder = elementPromise.placeholder || document.createElement("div");
            primitiveAppend(placeholder);
            setTimeout(async () => {
              try {
                const result = await elementPromise;
                if (!(result instanceof Array)) {
                  const htmlElement = _ElementalClass.makeHtmlElement(result);
                  placeholder.replaceWith(htmlElement);
                } else {
                  let parentElement = placeholder.parentElement;
                  if (!parentElement) {
                    parentElement = await new Promise((resolve, reject) => {
                      let intervalId = setInterval(() => {
                        if (placeholder.parentElement) {
                          resolve(placeholder.parentElement);
                          clearInterval(intervalId);
                        }
                      }, 70);
                    });
                  }
                  for (const each2 of result) {
                    try {
                      _ElementalClass.appendChildren({
                        element: parentElement,
                        insertBefore: placeholder
                      }, each2);
                    } catch (error) {
                      parentElement.insertBefore(placeholder, createErrorElement(\`When async component \${toString(element)} resolved, it created an array. One of those elements in the array caused an error when it tried to be added as a child:
 \${toString(error)}\`));
                    }
                  }
                }
              } catch (error) {
                placeholder.replaceWith(
                  defaultErrorComponentFactory({ ...properties, children }, key, error)
                );
              }
            }, 0);
          } else {
            primitiveAppend(_ElementalClass.makeHtmlElement(each));
          }
        }
        return element;
      };
      static css = function(first, ...args) {
        if (typeof first == "string") {
          return first;
        } else if (first == null) {
          return "";
        } else if (first instanceof Array) {
          const strings = first;
          const values = args;
          let finalString = "";
          for (const each of strings) {
            finalString += each;
            if (values.length > 0) {
              const value = values.shift();
              if (value instanceof Object) {
                finalString += Elemental.css(value);
              } else {
                finalString += \`\${value}\`;
              }
            }
          }
          return finalString;
        } else if (first instanceof Object) {
          let finalString = "";
          for (const [key2, value] of Object.entries(first)) {
            if (value != null) {
              finalString += \`\${kebabCase(key2)}: \${value};\`;
            }
          }
          return finalString;
        } else {
          return first;
        }
      };
      static combineClasses = (...classes) => {
        classes = classes.filter((each) => each != null);
        let classesFinalList = [];
        for (let eachEntry of classes) {
          if (typeof eachEntry == "string") {
            eachEntry = eachEntry.split(" ");
          }
          if (eachEntry instanceof Array) {
            eachEntry = eachEntry.flat(Infinity);
            for (let eachName of eachEntry) {
              classesFinalList.push(eachName);
            }
          } else if (eachEntry instanceof Object) {
            for (const [className, enabled] of Object.entries(eachEntry)) {
              if (enabled) {
                classesFinalList.push(className);
              }
            }
          }
        }
        return classesFinalList;
      };
      createElement(...args) {
        if (args[0] instanceof Array) {
          return this.xhtm(...args);
        } else {
          _ElementalClass.debug && console.debug(\`args is:\`, args);
          for (const middleware of (this.middleware[_ElementalClass.allTags] || []).concat(this.middleware[args[0]] || [])) {
            try {
              args = eachMiddleWare(args);
            } catch (error) {
              console.error("[ElementalClass] one of the middleware functions failed:", eachMiddleWare, args);
            }
          }
          let [key2, properties2, ...children] = args;
          _ElementalClass.debug && console.debug(\`key, properties, children is:\`, key2, properties2, children);
          if (this.components[key2] instanceof Function) {
            key2 = this.components[key2];
          }
          if (key2 instanceof Function) {
            let output;
            try {
              output = isConstructor(key2) ? new key2({ ...properties2, children }) : key2({ ...properties2, children });
            } catch (error) {
              return this.errorComponentFactory({ ...properties2, children }, key2, error);
            }
            if (output instanceof Promise) {
              const elementPromise = output;
              const placeholder = elementPromise.placeholder || this.defaultPlaceholderFactory(output);
              setTimeout(async () => {
                try {
                  const result = await elementPromise;
                  if (!(result instanceof Array)) {
                    const htmlElement = _ElementalClass.makeHtmlElement(result);
                    placeholder.replaceWith(htmlElement);
                  } else {
                    let parentElement = placeholder.parentElement;
                    if (!parentElement) {
                      parentElement = await new Promise((resolve, reject) => {
                        let intervalId = setInterval(() => {
                          if (placeholder.parentElement) {
                            resolve(placeholder.parentElement);
                            clearInterval(intervalId);
                          }
                        }, 70);
                      });
                    }
                    for (const each of result) {
                      try {
                        _ElementalClass.appendChildren({
                          element: parentElement,
                          insertBefore: placeholder
                        }, each);
                      } catch (error) {
                        parentElement.insertBefore(placeholder, createErrorElement(\`Something returned a promise, which resolved to an array, and then something tried to append those to an element (this element: \${element}). One of the items in the array \${each} caused an error when it tried to be added as a child:
 \${toString(error)}\`));
                      }
                    }
                  }
                } catch (error) {
                  placeholder.replaceWith(
                    this.errorComponentFactory({ ...properties2, children }, key2, error)
                  );
                }
              }, 0);
              return placeholder;
            } else {
              return output;
            }
          }
          const isSvg = _ElementalClass.exclusivelySvgElements.has(key2);
          let element;
          if (key2 == "iframe" && properties2.src) {
            const helper = document.createElement("div");
            helper.innerHTML = \`<iframe src=\${JSON.stringify(properties2.src)}></iframe>\`;
            element = helper.children[0];
            delete properties2.src;
          } else if (isSvg) {
            element = document.createElementNS("http://www.w3.org/2000/svg", key2);
          } else {
            element = document.createElement(key2);
          }
          let styleString = "";
          if (properties2 instanceof Object) {
            for (let [key3, value] of Object.entries(properties2)) {
              if (key3 == "style") {
                styleString += _ElementalClass.css(value);
                continue;
              }
              if (key3.slice(0, 2) == "on" && key3.slice(2, 3).toLowerCase() !== key3.slice(2, 3) && value instanceof Function) {
                element.addEventListener(key3.slice(2).toLowerCase(), value);
              }
              if (key3 == "class") {
                if (value instanceof Array) {
                  value = value.join(" ");
                } else if (value instanceof Object) {
                  let newValue = "";
                  for (const [classString, enable] of Object.entries(value)) {
                    if (enable) {
                      newValue += classString;
                    }
                  }
                  value = newValue;
                }
              }
              if (isSvg) {
                if (value instanceof Array) {
                  value = value.join(" ");
                }
                element.setAttribute(key3, value);
                element.setAttribute(kebabCase(key3), value);
                continue;
              }
              if (value != null && !(value instanceof Object) && validNonCallbackHtmlAttributes.has(key3)) {
                element.setAttribute(key3, value);
              }
              try {
                element[key3] = value;
              } catch (error) {
              }
              if (isValidStyleAttribute(key3)) {
                styleString += \`;\${key3}: \${value};\`;
              }
            }
          }
          if (styleString) {
            element.setAttribute("style", styleString);
          }
          return _ElementalClass.appendChildren(element, ...children);
        }
      }
      extend(additionalComponents = {}, options = {}) {
        const { middleware, ...other } = options || {};
        return Elemental(
          { ...this.components, ...additionalComponents },
          {
            middleware: { ...this.middleware, ...middleware },
            ...other
          }
        );
      }
    };
    Elemental = (...args) => {
      const elementalObject = new ElementalClass(...args);
      const createElementFunction = elementalObject.createElement.bind(elementalObject);
      attachProperties(ElementalClass, createElementFunction);
      attachProperties(elementalObject, createElementFunction);
      return createElementFunction;
    };
    attachProperties(ElementalClass, Elemental);
    try {
      const originalHead = document.head;
      Object.defineProperty(document, "head", {
        set: (element) => ElementalClass.appendChildren(originalHead, ...element.childNodes),
        get: () => originalHead,
        writable: true
      });
    } catch (error) {
    }
    passAlongProps = (element, properties2, { isSvg = false } = {}) => {
      let styleString = "";
      if (properties2 instanceof Object) {
        for (let [key2, value] of Object.entries(properties2)) {
          if (key2 == "style") {
            styleString += ElementalClass.css(value);
            continue;
          }
          if (key2.slice(0, 2) == "on" && key2.slice(2, 3).toLowerCase() !== key2.slice(2, 3) && value instanceof Function) {
            element.addEventListener(key2.slice(2).toLowerCase(), value);
          }
          if (key2 == "class") {
            if (value instanceof Array) {
              value = value.join(" ");
            } else if (value instanceof Object) {
              let newValue = "";
              for (const [classString, enable] of Object.entries(value)) {
                if (enable) {
                  newValue += classString;
                }
              }
              value = newValue;
            }
          }
          if (isSvg) {
            if (value instanceof Array) {
              value = value.join(" ");
            }
            element.setAttribute(key2, value);
            element.setAttribute(kebabCase(key2), value);
            continue;
          }
          if (value != null && !(value instanceof Object) && validNonCallbackHtmlAttributes.has(key2)) {
            element.setAttribute(key2, value);
          }
          try {
            element[key2] = value;
          } catch (error) {
          }
          if (isValidStyleAttribute(key2)) {
            styleString += \`;\${key2}: \${value};\`;
          }
        }
      }
      if (styleString) {
        element.setAttribute("style", \`\${element.getAttribute("style") || ""};\${styleString}\`);
      }
      if (properties2.children) {
        ElementalClass.appendChildren(element, ...properties2.children);
      }
      return element;
    };
    combineClasses = ElementalClass.combineClasses;
    html = Elemental();
    css = ElementalClass.css;
    allTags = ElementalClass.allTags;
    deno_default = {
      Elemental,
      html,
      css,
      allTags,
      combineClasses
    };
  }
});

// https://esm.sh/gh/jeff-hykin/elemental@0.6.5/main/deno.js?dev
var deno_exports = {};
__export(deno_exports, {
  Elemental: () => Elemental,
  allTags: () => allTags,
  combineClasses: () => combineClasses,
  css: () => css,
  default: () => deno_default,
  html: () => html,
  passAlongProps: () => passAlongProps,
  toHtmlElement: () => toHtmlElement
});
var init_deno = __esm({
  "https://esm.sh/gh/jeff-hykin/elemental@0.6.5/main/deno.js?dev"() {
    init_deno_development();
    init_deno_development();
  }
});

// main/frontend/main.js
var renderUiConnectionKey = Symbol.for("renderUiConnectionCore");
var { html: html2, passAlongProps: passAlongProps2 } = await Promise.resolve().then(() => (init_deno(), deno_exports));
var connections = globalThis[renderUiConnectionKey].connections;
globalThis.connections = connections;
console.debug(\`connections is:\`, connections);
function connect(connectionName) {
  const connection = connections[connectionName];
  if (connection) {
    const { hostname, port } = connection;
    console.log(\`connecting to \${hostname}:\${port}\`);
    return new WebSocket(\`ws://\${hostname}:\${port}/render_ui_listener/\${connectionName}\`);
  }
}
globalThis.connect = connect;
`