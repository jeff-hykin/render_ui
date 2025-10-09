// https://esm.sh/jsr/@webview/webview@0.9.0?dev
// https://esm.sh/@jsr/std__internal@1.0.12/denonext/os.development.mjs
function checkWindows() {
  const global = globalThis;
  const os = global.Deno?.build?.os;
  return typeof os === "string" ? os === "windows" : global.navigator?.platform?.startsWith("Win") ?? global.process?.platform?.startsWith("win") ?? false;
}
var isWindows = checkWindows();

// https://esm.sh/@jsr/std__path@1.1.2/denonext/_common/assert_path.development.mjs
function assertPath(path) {
  if (typeof path !== "string") {
    throw new TypeError(`Path must be a string, received "${JSON.stringify(path)}"`);
  }
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/_common/from_file_url.development.mjs
function assertArg(url2) {
  url2 = url2 instanceof URL ? url2 : new URL(url2);
  if (url2.protocol !== "file:") {
    throw new TypeError(`URL must be a file URL: received "${url2.protocol}"`);
  }
  return url2;
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/posix/from-file-url.development.mjs
function fromFileUrl(url2) {
  url2 = assertArg(url2);
  return decodeURIComponent(url2.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/_common/strip_trailing_separators.development.mjs
function stripTrailingSeparators(segment, isSep) {
  if (segment.length <= 1) {
    return segment;
  }
  let end = segment.length;
  for (let i = segment.length - 1; i > 0; i--) {
    if (isSep(segment.charCodeAt(i))) {
      end = i;
    } else {
      break;
    }
  }
  return segment.slice(0, end);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/_common/constants.development.mjs
var CHAR_UPPERCASE_A = 65;
var CHAR_LOWERCASE_A = 97;
var CHAR_UPPERCASE_Z = 90;
var CHAR_LOWERCASE_Z = 122;
var CHAR_DOT = 46;
var CHAR_FORWARD_SLASH = 47;
var CHAR_BACKWARD_SLASH = 92;
var CHAR_COLON = 58;

// https://esm.sh/@jsr/std__path@1.1.2/denonext/posix/_util.development.mjs
function isPosixPathSeparator(code2) {
  return code2 === CHAR_FORWARD_SLASH;
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/windows/_util.development.mjs
function isPosixPathSeparator2(code2) {
  return code2 === CHAR_FORWARD_SLASH;
}
function isPathSeparator(code2) {
  return code2 === CHAR_FORWARD_SLASH || code2 === CHAR_BACKWARD_SLASH;
}
function isWindowsDeviceRoot(code2) {
  return code2 >= CHAR_LOWERCASE_A && code2 <= CHAR_LOWERCASE_Z || code2 >= CHAR_UPPERCASE_A && code2 <= CHAR_UPPERCASE_Z;
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/windows/from-file-url.development.mjs
function fromFileUrl2(url2) {
  url2 = assertArg(url2);
  let path = decodeURIComponent(url2.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  if (url2.hostname !== "") {
    path = `\\\\${url2.hostname}${path}`;
  }
  return path;
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/_common/dirname.development.mjs
function assertArg2(path) {
  assertPath(path);
  if (path.length === 0) return ".";
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/posix/dirname.development.mjs
function dirname(path) {
  if (path instanceof URL) {
    path = fromFileUrl(path);
  }
  assertArg2(path);
  let end = -1;
  let matchedNonSeparator = false;
  for (let i = path.length - 1; i >= 1; --i) {
    if (isPosixPathSeparator(path.charCodeAt(i))) {
      if (matchedNonSeparator) {
        end = i;
        break;
      }
    } else {
      matchedNonSeparator = true;
    }
  }
  if (end === -1) {
    return isPosixPathSeparator(path.charCodeAt(0)) ? "/" : ".";
  }
  return stripTrailingSeparators(path.slice(0, end), isPosixPathSeparator);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/windows/dirname.development.mjs
function dirname2(path) {
  if (path instanceof URL) {
    path = fromFileUrl2(path);
  }
  assertArg2(path);
  const len = path.length;
  let rootEnd = -1;
  let end = -1;
  let matchedSlash = true;
  let offset = 0;
  const code2 = path.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code2)) {
      rootEnd = offset = 1;
      if (isPathSeparator(path.charCodeAt(1))) {
        let j = 2;
        let last = j;
        for (; j < len; ++j) {
          if (isPathSeparator(path.charCodeAt(j))) break;
        }
        if (j < len && j !== last) {
          last = j;
          for (; j < len; ++j) {
            if (!isPathSeparator(path.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            last = j;
            for (; j < len; ++j) {
              if (isPathSeparator(path.charCodeAt(j))) break;
            }
            if (j === len) {
              return path;
            }
            if (j !== last) {
              rootEnd = offset = j + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code2)) {
      if (path.charCodeAt(1) === CHAR_COLON) {
        rootEnd = offset = 2;
        if (len > 2) {
          if (isPathSeparator(path.charCodeAt(2))) rootEnd = offset = 3;
        }
      }
    }
  } else if (isPathSeparator(code2)) {
    return path;
  }
  for (let i = len - 1; i >= offset; --i) {
    if (isPathSeparator(path.charCodeAt(i))) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1) {
    if (rootEnd === -1) return ".";
    else end = rootEnd;
  }
  return stripTrailingSeparators(path.slice(0, end), isPosixPathSeparator2);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/dirname.development.mjs
function dirname3(path) {
  return isWindows ? dirname2(path) : dirname(path);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/posix/extname.development.mjs
function extname(path) {
  if (path instanceof URL) {
    path = fromFileUrl(path);
  }
  assertPath(path);
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  for (let i = path.length - 1; i >= 0; --i) {
    const code2 = path.charCodeAt(i);
    if (isPosixPathSeparator(code2)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code2 === CHAR_DOT) {
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path.slice(startDot, end);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/windows/extname.development.mjs
function extname2(path) {
  if (path instanceof URL) {
    path = fromFileUrl2(path);
  }
  assertPath(path);
  let start = 0;
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  if (path.length >= 2 && path.charCodeAt(1) === CHAR_COLON && isWindowsDeviceRoot(path.charCodeAt(0))) {
    start = startPart = 2;
  }
  for (let i = path.length - 1; i >= start; --i) {
    const code2 = path.charCodeAt(i);
    if (isPathSeparator(code2)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code2 === CHAR_DOT) {
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path.slice(startDot, end);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/extname.development.mjs
function extname3(path) {
  return isWindows ? extname2(path) : extname(path);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/from-file-url.development.mjs
function fromFileUrl3(url2) {
  return isWindows ? fromFileUrl2(url2) : fromFileUrl(url2);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/posix/is-absolute.development.mjs
function isAbsolute(path) {
  assertPath(path);
  return path.length > 0 && isPosixPathSeparator(path.charCodeAt(0));
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/windows/is-absolute.development.mjs
function isAbsolute2(path) {
  assertPath(path);
  const len = path.length;
  if (len === 0) return false;
  const code2 = path.charCodeAt(0);
  if (isPathSeparator(code2)) {
    return true;
  } else if (isWindowsDeviceRoot(code2)) {
    if (len > 2 && path.charCodeAt(1) === CHAR_COLON) {
      if (isPathSeparator(path.charCodeAt(2))) return true;
    }
  }
  return false;
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/is-absolute.development.mjs
function isAbsolute3(path) {
  return isWindows ? isAbsolute2(path) : isAbsolute(path);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/_common/normalize.development.mjs
function assertArg4(path) {
  assertPath(path);
  if (path.length === 0) return ".";
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/_common/normalize_string.development.mjs
function normalizeString(path, allowAboveRoot, separator, isPathSeparator2) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code2;
  for (let i = 0; i <= path.length; ++i) {
    if (i < path.length) code2 = path.charCodeAt(i);
    else if (isPathSeparator2(code2)) break;
    else code2 = CHAR_FORWARD_SLASH;
    if (isPathSeparator2(code2)) {
      if (lastSlash === i - 1 || dots === 1) {
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== CHAR_DOT || res.charCodeAt(res.length - 2) !== CHAR_DOT) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf(separator);
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += `${separator}..`;
          else res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += separator + path.slice(lastSlash + 1, i);
        else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code2 === CHAR_DOT && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/posix/normalize.development.mjs
function normalize(path) {
  if (path instanceof URL) {
    path = fromFileUrl(path);
  }
  assertArg4(path);
  const isAbsolute4 = isPosixPathSeparator(path.charCodeAt(0));
  const trailingSeparator = isPosixPathSeparator(path.charCodeAt(path.length - 1));
  path = normalizeString(path, !isAbsolute4, "/", isPosixPathSeparator);
  if (path.length === 0 && !isAbsolute4) path = ".";
  if (path.length > 0 && trailingSeparator) path += "/";
  if (isAbsolute4) return `/${path}`;
  return path;
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/posix/join.development.mjs
function join(path, ...paths) {
  if (path === void 0) return ".";
  if (path instanceof URL) {
    path = fromFileUrl(path);
  }
  paths = path ? [
    path,
    ...paths
  ] : paths;
  paths.forEach((path2) => assertPath(path2));
  const joined = paths.filter((path2) => path2.length > 0).join("/");
  return joined === "" ? "." : normalize(joined);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/windows/normalize.development.mjs
function normalize2(path) {
  if (path instanceof URL) {
    path = fromFileUrl2(path);
  }
  assertArg4(path);
  const len = path.length;
  let rootEnd = 0;
  let device;
  let isAbsolute4 = false;
  const code2 = path.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code2)) {
      isAbsolute4 = true;
      if (isPathSeparator(path.charCodeAt(1))) {
        let j = 2;
        let last = j;
        for (; j < len; ++j) {
          if (isPathSeparator(path.charCodeAt(j))) break;
        }
        if (j < len && j !== last) {
          const firstPart = path.slice(last, j);
          last = j;
          for (; j < len; ++j) {
            if (!isPathSeparator(path.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            last = j;
            for (; j < len; ++j) {
              if (isPathSeparator(path.charCodeAt(j))) break;
            }
            if (j === len) {
              return `\\\\${firstPart}\\${path.slice(last)}\\`;
            } else if (j !== last) {
              device = `\\\\${firstPart}\\${path.slice(last, j)}`;
              rootEnd = j;
            }
          }
        }
      } else {
        rootEnd = 1;
      }
    } else if (isWindowsDeviceRoot(code2)) {
      if (path.charCodeAt(1) === CHAR_COLON) {
        device = path.slice(0, 2);
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator(path.charCodeAt(2))) {
            isAbsolute4 = true;
            rootEnd = 3;
          }
        }
      }
    }
  } else if (isPathSeparator(code2)) {
    return "\\";
  }
  let tail;
  if (rootEnd < len) {
    tail = normalizeString(path.slice(rootEnd), !isAbsolute4, "\\", isPathSeparator);
  } else {
    tail = "";
  }
  if (tail.length === 0 && !isAbsolute4) tail = ".";
  if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
    tail += "\\";
  }
  if (device === void 0) {
    if (isAbsolute4) {
      if (tail.length > 0) return `\\${tail}`;
      else return "\\";
    }
    return tail;
  } else if (isAbsolute4) {
    if (tail.length > 0) return `${device}\\${tail}`;
    else return `${device}\\`;
  }
  return device + tail;
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/windows/join.development.mjs
function join2(path, ...paths) {
  if (path instanceof URL) {
    path = fromFileUrl2(path);
  }
  paths = path ? [
    path,
    ...paths
  ] : paths;
  paths.forEach((path2) => assertPath(path2));
  paths = paths.filter((path2) => path2.length > 0);
  if (paths.length === 0) return ".";
  let needsReplace = true;
  let slashCount = 0;
  const firstPart = paths[0];
  if (isPathSeparator(firstPart.charCodeAt(0))) {
    ++slashCount;
    const firstLen = firstPart.length;
    if (firstLen > 1) {
      if (isPathSeparator(firstPart.charCodeAt(1))) {
        ++slashCount;
        if (firstLen > 2) {
          if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
          else {
            needsReplace = false;
          }
        }
      }
    }
  }
  let joined = paths.join("\\");
  if (needsReplace) {
    for (; slashCount < joined.length; ++slashCount) {
      if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
    }
    if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
  }
  return normalize2(joined);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/join.development.mjs
function join3(path, ...paths) {
  return isWindows ? join2(path, ...paths) : join(path, ...paths);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/normalize.development.mjs
function normalize3(path) {
  return isWindows ? normalize2(path) : normalize(path);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/posix/resolve.development.mjs
function resolve(...pathSegments) {
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    let path;
    if (i >= 0) path = pathSegments[i];
    else {
      const { Deno: Deno3 } = globalThis;
      if (typeof Deno3?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a current working directory (CWD)");
      }
      path = Deno3.cwd();
    }
    assertPath(path);
    if (path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isPosixPathSeparator(path.charCodeAt(0));
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator);
  if (resolvedAbsolute) {
    if (resolvedPath.length > 0) return `/${resolvedPath}`;
    else return "/";
  } else if (resolvedPath.length > 0) return resolvedPath;
  else return ".";
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/windows/resolve.development.mjs
function resolve2(...pathSegments) {
  let resolvedDevice = "";
  let resolvedTail = "";
  let resolvedAbsolute = false;
  for (let i = pathSegments.length - 1; i >= -1; i--) {
    let path;
    const { Deno: Deno3 } = globalThis;
    if (i >= 0) {
      path = pathSegments[i];
    } else if (!resolvedDevice) {
      if (typeof Deno3?.cwd !== "function") {
        throw new TypeError("Resolved a drive-letter-less path without a current working directory (CWD)");
      }
      path = Deno3.cwd();
    } else {
      if (typeof Deno3?.env?.get !== "function" || typeof Deno3?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a current working directory (CWD)");
      }
      path = Deno3.cwd();
      if (path === void 0 || path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
        path = `${resolvedDevice}\\`;
      }
    }
    assertPath(path);
    const len = path.length;
    if (len === 0) continue;
    let rootEnd = 0;
    let device = "";
    let isAbsolute4 = false;
    const code2 = path.charCodeAt(0);
    if (len > 1) {
      if (isPathSeparator(code2)) {
        isAbsolute4 = true;
        if (isPathSeparator(path.charCodeAt(1))) {
          let j = 2;
          let last = j;
          for (; j < len; ++j) {
            if (isPathSeparator(path.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            const firstPart = path.slice(last, j);
            last = j;
            for (; j < len; ++j) {
              if (!isPathSeparator(path.charCodeAt(j))) break;
            }
            if (j < len && j !== last) {
              last = j;
              for (; j < len; ++j) {
                if (isPathSeparator(path.charCodeAt(j))) break;
              }
              if (j === len) {
                device = `\\\\${firstPart}\\${path.slice(last)}`;
                rootEnd = j;
              } else if (j !== last) {
                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                rootEnd = j;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot(code2)) {
        if (path.charCodeAt(1) === CHAR_COLON) {
          device = path.slice(0, 2);
          rootEnd = 2;
          if (len > 2) {
            if (isPathSeparator(path.charCodeAt(2))) {
              isAbsolute4 = true;
              rootEnd = 3;
            }
          }
        }
      }
    } else if (isPathSeparator(code2)) {
      rootEnd = 1;
      isAbsolute4 = true;
    }
    if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
      continue;
    }
    if (resolvedDevice.length === 0 && device.length > 0) {
      resolvedDevice = device;
    }
    if (!resolvedAbsolute) {
      resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
      resolvedAbsolute = isAbsolute4;
    }
    if (resolvedAbsolute && resolvedDevice.length > 0) break;
  }
  resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator);
  return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/resolve.development.mjs
function resolve3(...pathSegments) {
  return isWindows ? resolve2(...pathSegments) : resolve(...pathSegments);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/_common/to_file_url.development.mjs
var WHITESPACE_ENCODINGS = {
  "	": "%09",
  "\n": "%0A",
  "\v": "%0B",
  "\f": "%0C",
  "\r": "%0D",
  " ": "%20"
};
function encodeWhitespace(string) {
  return string.replaceAll(/[\s]/g, (c) => {
    return WHITESPACE_ENCODINGS[c] ?? c;
  });
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/posix/to-file-url.development.mjs
function toFileUrl(path) {
  if (!isAbsolute(path)) {
    throw new TypeError(`Path must be absolute: received "${path}"`);
  }
  const url2 = new URL("file:///");
  url2.pathname = encodeWhitespace(path.replace(/%/g, "%25").replace(/\\/g, "%5C"));
  return url2;
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/windows/to-file-url.development.mjs
function toFileUrl2(path) {
  if (!isAbsolute2(path)) {
    throw new TypeError(`Path must be absolute: received "${path}"`);
  }
  const [, hostname, pathname] = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
  const url2 = new URL("file:///");
  url2.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
  if (hostname !== void 0 && hostname !== "localhost") {
    url2.hostname = hostname;
    if (!url2.hostname) {
      throw new TypeError(`Invalid hostname: "${url2.hostname}"`);
    }
  }
  return url2;
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/to-file-url.development.mjs
function toFileUrl3(path) {
  return isWindows ? toFileUrl2(path) : toFileUrl(path);
}

// https://esm.sh/@jsr/std__path@1.1.2/denonext/types.development.mjs
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_types = __commonJS({
  "node_modules/@jsr/std__path/types.js"() {
  }
});
var cjsm = __toESM(require_types());
var endpoint_default = cjsm.default ?? cjsm;

// https://esm.sh/@jsr/std__fs@1.0.19/denonext/_get_file_info_type.development.mjs
function getFileInfoType(fileInfo) {
  return fileInfo.isFile ? "file" : fileInfo.isDirectory ? "dir" : fileInfo.isSymlink ? "symlink" : void 0;
}

// https://esm.sh/@jsr/std__fs@1.0.19/denonext/ensure-dir.development.mjs
async function ensureDir(dir) {
  try {
    const fileInfo = await Deno.stat(dir);
    throwIfNotDirectory(fileInfo);
    return;
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }
  }
  try {
    await Deno.mkdir(dir, {
      recursive: true
    });
  } catch (err) {
    if (!(err instanceof Deno.errors.AlreadyExists)) {
      throw err;
    }
    const fileInfo = await Deno.stat(dir);
    throwIfNotDirectory(fileInfo);
  }
}
function throwIfNotDirectory(fileInfo) {
  if (!fileInfo.isDirectory) {
    throw new Error(`Failed to ensure directory exists: expected 'dir', got '${getFileInfoType(fileInfo)}'`);
  }
}

// https://esm.sh/@jsr/std__fs@1.0.19/denonext/eol.development.mjs
var LF = "\n";
var CRLF = "\r\n";
var EOL = (
  // deno-lint-ignore no-explicit-any
  globalThis.Deno?.build.os === "windows" ? CRLF : LF
);

// https://esm.sh/@jsr/std__fs@1.0.19/denonext/move.development.mjs
var EXISTS_ERROR = new Deno.errors.AlreadyExists("dest already exists.");

// https://esm.sh/@jsr/std__fmt@1.0.8/denonext/colors.development.mjs
var { Deno: Deno2 } = globalThis;
var noColor = typeof Deno2?.noColor === "boolean" ? Deno2.noColor : false;
var enabled = !noColor;
function code(open, close) {
  return {
    open: `\x1B[${open.join(";")}m`,
    close: `\x1B[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g")
  };
}
function run(str, code2) {
  return enabled ? `${code2.open}${str.replace(code2.regexp, code2.open)}${code2.close}` : str;
}
function green(str) {
  return run(str, code([
    32
  ], 39));
}
var ANSI_PATTERN = new RegExp([
  "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
  "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TXZcf-nq-uy=><~]))"
].join("|"), "g");

// https://esm.sh/@jsr/std__encoding@1.0.10/denonext/_common16.development.mjs
var alphabet = new TextEncoder().encode("0123456789abcdef");
var rAlphabet = new Uint8Array(128).fill(16);
alphabet.forEach((byte, i) => rAlphabet[byte] = i);
new TextEncoder().encode("ABCDEF").forEach((byte, i) => rAlphabet[byte] = i + 10);
function calcSizeHex(originalSize) {
  return originalSize * 2;
}
function encode(buffer, i, o, alphabet22) {
  for (; i < buffer.length; ++i) {
    const x = buffer[i];
    buffer[o++] = alphabet22[x >> 4];
    buffer[o++] = alphabet22[x & 15];
  }
  return o;
}

// https://esm.sh/@jsr/std__encoding@1.0.10/denonext/_common_detach.development.mjs
function detach(buffer, maxSize) {
  const originalSize = buffer.length;
  if (buffer.byteOffset) {
    const b = new Uint8Array(buffer.buffer);
    b.set(buffer);
    buffer = b.subarray(0, originalSize);
  }
  buffer = new Uint8Array(buffer.buffer.transfer(maxSize));
  buffer.set(buffer.subarray(0, originalSize), maxSize - originalSize);
  return [
    buffer,
    maxSize - originalSize
  ];
}

// https://esm.sh/@jsr/std__encoding@1.0.10/denonext/hex.development.mjs
var alphabet2 = new TextEncoder().encode("0123456789abcdef");
var rAlphabet2 = new Uint8Array(128).fill(16);
alphabet2.forEach((byte, i) => rAlphabet2[byte] = i);
new TextEncoder().encode("ABCDEF").forEach((byte, i) => rAlphabet2[byte] = i + 10);
function encodeHex(src) {
  if (typeof src === "string") {
    src = new TextEncoder().encode(src);
  } else if (src instanceof ArrayBuffer) src = new Uint8Array(src).slice();
  else src = src.slice();
  const [output, i] = detach(src, calcSizeHex(src.length));
  encode(output, i, 0, alphabet2);
  return new TextDecoder().decode(output);
}

// https://esm.sh/@jsr/denosaurs__plug@1.1.0/denonext/util.development.mjs
var encoder = new TextEncoder();
function baseUrlToFilename(url2) {
  const out = [];
  const protocol = url2.protocol.replace(":", "");
  out.push(protocol);
  switch (protocol) {
    case "http":
    case "https": {
      const host = url2.hostname;
      const hostPort = url2.port;
      out.push(hostPort ? `${host}_PORT${hostPort}` : host);
      break;
    }
    case "file":
    case "data":
    case "blob":
      break;
    default:
      throw new TypeError(`Don't know how to create cache name for protocol: ${protocol}`);
  }
  return join3(...out);
}
function stringToURL(url2) {
  return url2.startsWith("file://") || url2.startsWith("http://") || url2.startsWith("https://") ? new URL(url2) : toFileUrl3(resolve3(url2));
}
async function hash(value) {
  return encodeHex(new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value))));
}
async function urlToFilename(url2) {
  const cacheFilename = baseUrlToFilename(url2);
  const hashedFilename = await hash(url2.pathname + url2.search);
  return join3(cacheFilename, hashedFilename);
}
async function isFile(filePath) {
  try {
    const stats = await Deno.lstat(filePath);
    return stats.isFile;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}
function homeDir() {
  switch (Deno.build.os) {
    case "windows":
      return Deno.env.get("USERPROFILE");
    case "linux":
    case "darwin":
    case "freebsd":
    case "netbsd":
    case "aix":
    case "solaris":
    case "illumos":
    case "android":
      return Deno.env.get("HOME");
    default:
      throw Error("unreachable");
  }
}
function cacheDir() {
  if (Deno.build.os === "darwin") {
    const home = homeDir();
    if (home) {
      return join3(home, "Library/Caches");
    }
  } else if (Deno.build.os === "windows") {
    return Deno.env.get("LOCALAPPDATA");
  } else {
    const cacheHome = Deno.env.get("XDG_CACHE_HOME");
    if (cacheHome) {
      return cacheHome;
    } else {
      const home = homeDir();
      if (home) {
        return join3(home, ".cache");
      }
    }
  }
}
function denoCacheDir() {
  const dd = Deno.env.get("DENO_DIR");
  let root;
  if (dd) {
    root = normalize3(isAbsolute3(dd) ? dd : join3(Deno.cwd(), dd));
  } else {
    const cd = cacheDir();
    if (cd) {
      root = join3(cd, "deno");
    } else {
      const hd = homeDir();
      if (hd) {
        root = join3(hd, ".deno");
      }
    }
  }
  return root;
}

// https://esm.sh/@jsr/denosaurs__plug@1.1.0/denonext/download.development.mjs
var ALL_ARCHS = [
  "x86_64",
  "aarch64"
];
var ALL_OSS = [
  "darwin",
  "linux",
  "android",
  "windows",
  "freebsd",
  "netbsd",
  "aix",
  "solaris",
  "illumos"
];
var defaultExtensions = {
  darwin: "dylib",
  linux: "so",
  windows: "dll",
  freebsd: "so",
  netbsd: "so",
  aix: "so",
  solaris: "so",
  illumos: "so",
  android: "so"
};
var defaultPrefixes = {
  darwin: "lib",
  linux: "lib",
  netbsd: "lib",
  freebsd: "lib",
  aix: "lib",
  solaris: "lib",
  illumos: "lib",
  windows: "",
  android: "lib"
};
function getCrossOption(record) {
  if (record === void 0) {
    return;
  }
  if (ALL_OSS.some((os) => os in record)) {
    const subrecord = record[Deno.build.os];
    if (subrecord && typeof subrecord === "object" && ALL_ARCHS.some((arch) => arch in subrecord)) {
      return subrecord[Deno.build.arch];
    } else {
      return subrecord;
    }
  }
  if (ALL_ARCHS.some((arch) => arch in record)) {
    const subrecord = record[Deno.build.arch];
    if (subrecord && typeof subrecord === "object" && ALL_OSS.some((os) => os in subrecord)) {
      return subrecord[Deno.build.os];
    } else {
      return subrecord;
    }
  }
}
function createDownloadURL(options) {
  if (typeof options === "string" || options instanceof URL) {
    options = {
      url: options
    };
  }
  options.extensions ??= defaultExtensions;
  options.prefixes ??= defaultPrefixes;
  for (const key in options.extensions) {
    const os = key;
    if (options.extensions[os] !== void 0) {
      options.extensions[os] = options.extensions[os].replace(/\.?(.+)/, "$1");
    }
  }
  let url2;
  if (options.url instanceof URL) {
    url2 = options.url;
  } else if (typeof options.url === "string") {
    url2 = stringToURL(options.url);
  } else {
    const tmpUrl = getCrossOption(options.url);
    if (tmpUrl === void 0) {
      throw new TypeError(`An URL for the "${Deno.build.os}-${Deno.build.arch}" target was not provided.`);
    }
    if (typeof tmpUrl === "string") {
      url2 = stringToURL(tmpUrl);
    } else {
      url2 = tmpUrl;
    }
  }
  if ("name" in options && !Object.values(options.extensions).includes(extname3(url2.pathname))) {
    if (!url2.pathname.endsWith("/")) {
      url2.pathname = `${url2.pathname}/`;
    }
    const prefix = getCrossOption(options.prefixes) ?? "";
    const suffix = getCrossOption(options.suffixes) ?? "";
    const extension = options.extensions[Deno.build.os];
    if (options.name === void 0) {
      throw new TypeError(`Expected the "name" property for an automatically assembled URL.`);
    }
    const filename = `${prefix}${options.name}${suffix}.${extension}`;
    url2 = new URL(filename, url2);
  }
  return url2;
}
async function ensureCacheLocation(location = "deno") {
  if (location === "deno") {
    const dir = denoCacheDir();
    if (dir === void 0) {
      throw new Error("Could not get the deno cache directory, try using another CacheLocation in the plug options.");
    }
    location = join3(dir, "plug");
  } else if (location === "cache") {
    const dir = cacheDir();
    if (dir === void 0) {
      throw new Error("Could not get the cache directory, try using another CacheLocation in the plug options.");
    }
    location = join3(dir, "plug");
  } else if (location === "cwd") {
    location = join3(Deno.cwd(), "plug");
  } else if (location === "tmp") {
    location = await Deno.makeTempDir({
      prefix: "plug"
    });
  } else if (typeof location === "string" && location.startsWith("file://")) {
    location = fromFileUrl3(location);
  } else if (location instanceof URL) {
    if (location?.protocol !== "file:") {
      throw new TypeError("Cannot use any other protocol than file:// for an URL cache location.");
    }
    location = fromFileUrl3(location);
  }
  location = resolve3(normalize3(location));
  await ensureDir(location);
  return location;
}
async function download(options) {
  const location = (typeof options === "object" && "location" in options ? options.location : void 0) ?? "deno";
  const setting = (typeof options === "object" && "cache" in options ? options.cache : void 0) ?? "use";
  const url2 = createDownloadURL(options);
  const directory = await ensureCacheLocation(location);
  const cacheBasePath = join3(directory, await urlToFilename(url2));
  const cacheFilePath = `${cacheBasePath}${extname3(url2.pathname)}`;
  const cacheMetaPath = `${cacheBasePath}.metadata.json`;
  const cached = setting === "use" ? await isFile(cacheFilePath) : setting === "only" || setting !== "reloadAll";
  await ensureDir(dirname3(cacheBasePath));
  if (!cached) {
    const meta = {
      url: url2
    };
    switch (url2.protocol) {
      case "http:":
      case "https:": {
        console.log(`${green("Downloading")} ${url2}`);
        const response = await fetch(url2.toString());
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Could not find ${url2}`);
          } else {
            throw new Deno.errors.Http(`${response.status} ${response.statusText}`);
          }
        }
        await Deno.writeFile(cacheFilePath, new Uint8Array(await response.arrayBuffer()));
        break;
      }
      case "file:": {
        console.log(`${green("Copying")} ${url2}`);
        await Deno.copyFile(fromFileUrl3(url2), cacheFilePath);
        if (Deno.build.os !== "windows") {
          await Deno.chmod(cacheFilePath, 420);
        }
        break;
      }
      default: {
        throw new TypeError(`Cannot fetch to cache using the "${url2.protocol}" protocol`);
      }
    }
    await Deno.writeTextFile(cacheMetaPath, JSON.stringify(meta));
  }
  if (!await isFile(cacheFilePath)) {
    throw new Error(`Could not find "${url2}" in cache.`);
  }
  return cacheFilePath;
}

// https://esm.sh/@jsr/denosaurs__plug@1.1.0/denonext/denosaurs__plug.development.mjs
async function dlopen(options, symbols) {
  console.debug(`dlopen:`,options)
  if (Deno.dlopen === void 0) {
    throw new Error("`--unstable-ffi` is required");
  }
  return Deno.dlopen(await download(options), symbols);
}

// https://esm.sh/@jsr/webview__webview@0.9.0/denonext/webview__webview.development.mjs
var deno_default = {
  name: "@webview/webview",
  version: "0.9.0",
  exports: "./mod.ts",
  lock: false,
  tasks: {
    build: "deno run -A script/build.ts",
    run: 'deno task build && export PLUGIN_URL="./build/" && deno run -A --unstable-ffi',
    "run:fast": 'export PLUGIN_URL="./build/" && deno run -A --unstable-ffi'
  },
  unstable: ["ffi"],
  fmt: {
    exclude: ["webview/"]
  },
  imports: { "@denosaurs/plug": "jsr:@denosaurs/plug@^1.0" }
};
var version = deno_default.version;
var cache = Deno.env.get("PLUGIN_URL") === void 0 ? "use" : "reloadAll";
var url = Deno.env.get("PLUGIN_URL") ?? `https://github.com/webview/webview_deno/releases/download/${version}/`;
var encoder2 = new TextEncoder();
function encodeCString(value) {
  return encoder2.encode(value + "\0");
}
async function checkForWebView2Loader() {
  return await Deno.stat("./WebView2Loader.dll").then(() => true, (e) => e instanceof Deno.errors.NotFound ? false : true);
}
var preloaded = false;
var instances = [];
async function preload() {
  if (preloaded) return;
  if (Deno.build.os === "windows") {
    if (await checkForWebView2Loader()) {
      await Deno.remove("./WebView2Loader.dll");
    }
    const webview2loader = await download({
      url: `${url}/WebView2Loader.dll`,
      cache
    });
    await Deno.copyFile(webview2loader, "./WebView2Loader.dll");
    self.addEventListener("unload", unload);
  }
  preloaded = true;
}
function unload() {
  for (const instance of instances) {
    instance.destroy();
  }
  lib.close();
  if (Deno.build.os === "windows") {
    Deno.removeSync("./WebView2Loader.dll");
  }
}
if (Deno.build.os === "windows") {
  if (!await checkForWebView2Loader()) {
    if (self === globalThis) {
      await preload();
    } else {
      throw new Error("WebView2Loader.dll does not exist! Make sure to run preload() from the main thread.");
    }
  }
}
var lib = await dlopen({
  name: "webview",
  url,
  cache,
  suffixes: {
    linux: `.${Deno.build.arch}`,
    darwin: `.${Deno.build.arch}`
  }
}, {
  "webview_create": {
    parameters: [
      "i32",
      "pointer"
    ],
    result: "pointer"
  },
  "webview_destroy": {
    parameters: [
      "pointer"
    ],
    result: "void"
  },
  "webview_run": {
    parameters: [
      "pointer"
    ],
    result: "void"
  },
  "webview_terminate": {
    parameters: [
      "pointer"
    ],
    result: "void"
  },
  // "webview_dispatch": {
  //   parameters: ["pointer", { function: { parameters: ["pointer", "pointer"], result: "void" } }, "pointer"],
  //   result: "void",
  // },
  "webview_get_window": {
    parameters: [
      "pointer"
    ],
    result: "pointer"
  },
  "webview_set_title": {
    parameters: [
      "pointer",
      "buffer"
    ],
    result: "void"
  },
  "webview_set_size": {
    parameters: [
      "pointer",
      "i32",
      "i32",
      "i32"
    ],
    result: "void"
  },
  "webview_navigate": {
    parameters: [
      "pointer",
      "buffer"
    ],
    result: "void"
  },
  "webview_set_html": {
    parameters: [
      "pointer",
      "pointer"
    ],
    result: "void"
  },
  "webview_init": {
    parameters: [
      "pointer",
      "buffer"
    ],
    result: "void"
  },
  "webview_eval": {
    parameters: [
      "pointer",
      "buffer"
    ],
    result: "void"
  },
  "webview_bind": {
    parameters: [
      "pointer",
      "buffer",
      "function",
      "pointer"
    ],
    result: "void"
  },
  "webview_unbind": {
    parameters: [
      "pointer",
      "buffer"
    ],
    result: "void"
  },
  "webview_return": {
    parameters: [
      "pointer",
      "buffer",
      "i32",
      "buffer"
    ],
    result: "void"
  }
});
var SizeHint = {
  /** Width and height are default size */
  NONE: 0,
  /** Width and height are minimum bounds */
  MIN: 1,
  /** Width and height are maximum bounds */
  MAX: 2,
  /** Window size can not be changed by a user */
  FIXED: 3
};
var Webview = class {
  #handle = null;
  #callbacks = /* @__PURE__ */ new Map();
  /** **UNSAFE**: Highly unsafe API, beware!
   *
   * An unsafe pointer to the webview
   */
  get unsafeHandle() {
    return this.#handle;
  }
  /** **UNSAFE**: Highly unsafe API, beware!
   *
   * An unsafe pointer to the webviews platform specific native window handle.
   * When using GTK backend the pointer is `GtkWindow` pointer, when using Cocoa
   * backend the pointer is `NSWindow` pointer, when using Win32 backend the
   * pointer is `HWND` pointer.
   */
  get unsafeWindowHandle() {
    return lib.symbols.webview_get_window(this.#handle);
  }
  /**
   * Sets the native window size
   *
   * ## Example
   *
   * ```ts
   * import { Webview, SizeHint } from "../mod.ts";
   *
   * const webview = new Webview();
   * webview.navigate("https://deno.land/");
   *
   * // Change from the default size to a small fixed window
   * webview.size = {
   *   width: 200,
   *   height: 200,
   *   hint: SizeHint.FIXED
   * };
   *
   * webview.run();
   * ```
   */
  set size({ width, height, hint }) {
    lib.symbols.webview_set_size(this.#handle, width, height, hint);
  }
  /**
   * Sets the native window title
   *
   * ## Example
   *
   * ```ts
   * import { Webview } from "../mod.ts";
   *
   * const webview = new Webview();
   * webview.navigate("https://deno.land/");
   *
   * // Set the window title to "Hello world!"
   * webview.title = "Hello world!";
   *
   * webview.run();
   * ```
   */
  set title(title) {
    lib.symbols.webview_set_title(this.#handle, encodeCString(title));
  }
  constructor(debugOrHandle = false, size = {
    width: 1024,
    height: 768,
    hint: SizeHint.NONE
  }, window = null) {
    this.#handle = typeof debugOrHandle === "bigint" || typeof debugOrHandle === "number" ? debugOrHandle : lib.symbols.webview_create(Number(debugOrHandle), window);
    if (size !== void 0) {
      this.size = size;
    }
    instances.push(this);
  }
  /**
   * Destroys the webview and closes the window along with freeing all internal
   * resources.
   */
  destroy() {
    for (const callback of Object.keys(this.#callbacks)) {
      this.unbind(callback);
    }
    lib.symbols.webview_terminate(this.#handle);
    lib.symbols.webview_destroy(this.#handle);
    this.#handle = null;
  }
  /**
   * Navigates webview to the given URL. URL may be a data URI, i.e.
   * `"data:text/html,<html>...</html>"`. It is often ok not to url-encodeCString it
   * properly, webview will re-encodeCString it for you.
   */
  navigate(url2) {
    lib.symbols.webview_navigate(this.#handle, encodeCString(url2 instanceof URL ? url2.toString() : url2));
  }
  /**
   * Runs the main event loop until it's terminated. After this function exits
   * the webview is automatically destroyed.
   */
  run() {
    lib.symbols.webview_run(this.#handle);
    this.destroy();
  }
  /**
   * Binds a callback so that it will appear in the webview with the given name
   * as a global async JavaScript function. Callback receives a seq and req value.
   * The seq parameter is an identifier for using {@link Webview.return} to
   * return a value while the req parameter is a string of an JSON array representing
   * the arguments passed from the JavaScript function call.
   *
   * @param name The name of the bound function
   * @param callback A callback which takes two strings as parameters: `seq`
   * and `req` and the passed {@link arg} pointer
   * @param arg A pointer which is going to be passed to the callback once called
   */
  bindRaw(name, callback, arg = null) {
    const callbackResource = new Deno.UnsafeCallback({
      parameters: [
        "pointer",
        "pointer",
        "pointer"
      ],
      result: "void"
    }, (seqPtr, reqPtr, arg2) => {
      const seq = seqPtr ? new Deno.UnsafePointerView(seqPtr).getCString() : "";
      const req = reqPtr ? new Deno.UnsafePointerView(reqPtr).getCString() : "";
      callback(seq, req, arg2);
    });
    this.#callbacks.set(name, callbackResource);
    lib.symbols.webview_bind(this.#handle, encodeCString(name), callbackResource.pointer, arg);
  }
  /**
   * Binds a callback so that it will appear in the webview with the given name
   * as a global async JavaScript function. Callback arguments are automatically
   * converted from json to as closely as possible match the arguments in the
   * webview context and the callback automatically converts and returns the
   * return value to the webview.
   *
   * @param name The name of the bound function
   * @param callback A callback which is passed the arguments as called from the
   * webview JavaScript environment and optionally returns a value to the
   * webview JavaScript caller
   *
   * ## Example
   * ```ts
   * import { Webview } from "../mod.ts";
   *
   * const html = `
   *   <html>
   *   <body>
   *     <h1>Hello from deno v${Deno.version.deno}</h1>
   *     <button onclick="press('I was pressed!', 123, new Date()).then(log);">
   *       Press me!
   *     </button>
   *   </body>
   *   </html>
   * `;
   *
   * const webview = new Webview();
   *
   * webview.navigate(`data:text/html,${encodeURIComponent(html)}`);
   *
   * let counter = 0;
   * // Create and bind `press` to the webview javascript instance.
   * // This functions in addition to logging its parameters also returns
   * // a value from deno land to webview land.
   * webview.bind("press", (a, b, c) => {
   *   console.log(a, b, c);
   *
   *   return { times: counter++ };
   * });
   *
   * // Bind the `log` function in the webview to the parent instances `console.log`
   * webview.bind("log", (...args) => console.log(...args));
   *
   * webview.run();
   * ```
   */
  bind(name, callback) {
    this.bindRaw(name, (seq, req) => {
      const args = JSON.parse(req);
      let result;
      let success;
      try {
        result = callback(...args);
        success = true;
      } catch (err) {
        result = err;
        success = false;
      }
      if (result instanceof Promise) {
        result.then((result2) => this.return(seq, success ? 0 : 1, JSON.stringify(result2)));
      } else {
        this.return(seq, success ? 0 : 1, JSON.stringify(result));
      }
    });
  }
  /**
   * Unbinds a previously bound function freeing its resource and removing it
   * from the webview JavaScript context.
   *
   * @param name The name of the bound function
   */
  unbind(name) {
    lib.symbols.webview_unbind(this.#handle, encodeCString(name));
    this.#callbacks.get(name)?.close();
    this.#callbacks.delete(name);
  }
  /**
   * Returns a value to the webview JavaScript environment.
   *
   * @param seq The request pointer as provided by the {@link Webview.bindRaw}
   * callback
   * @param status If status is zero the result is expected to be a valid JSON
   * result value otherwise the result is an error JSON object
   * @param result The stringified JSON response
   */
  return(seq, status, result) {
    lib.symbols.webview_return(this.#handle, encodeCString(seq), status, encodeCString(result));
  }
  /**
   * Evaluates arbitrary JavaScript code. Evaluation happens asynchronously,
   * also the result of the expression is ignored. Use
   * {@link Webview.bind bindings} if you want to receive notifications about
   * the results of the evaluation.
   */
  eval(source) {
    lib.symbols.webview_eval(this.#handle, encodeCString(source));
  }
  /**
   * Injects JavaScript code at the initialization of the new page. Every time
   * the webview will open a the new page - this initialization code will be
   * executed. It is guaranteed that code is executed before window.onload.
   */
  init(source) {
    lib.symbols.webview_init(this.#handle, encodeCString(source));
  }
};
export {
  SizeHint,
  Webview,
  preload,
  unload
};
