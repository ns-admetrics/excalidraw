import React from "react";
import oc from "open-color";
import { t } from "../i18n";
import { isDarwin } from "../keys";
import { Dialog } from "./Dialog";
import { getShortcutKey } from "../utils";

const Columns = (props: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    }}
  >
    {props.children}
  </div>
);

const Column = (props: { children: React.ReactNode }) => (
  <div
    style={{
      width: "49%",
    }}
  >
    {props.children}
  </div>
);

const ShortcutIsland = (props: {
  caption: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      border: `1px solid ${oc.gray[4]}`,
      marginBottom: "16px",
    }}
  >
    <h3
      style={{
        margin: "0",
        padding: "4px",
        backgroundColor: oc.gray[2],
        textAlign: "center",
      }}
    >
      {props.caption}
    </h3>
    {props.children}
  </div>
);

const Shortcut = (props: {
  label: string;
  shortcuts: string[];
  isOr: boolean;
}) => {
  const isRTL = document.documentElement.getAttribute("dir") === "rtl";
  return (
    <div
      style={{
        borderTop: `1px solid ${oc.gray[4]}`,
      }}
    >
      <div
        style={{
          display: "flex",
          margin: "0",
          padding: "4px 8px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            lineHeight: 1.4,
          }}
        >
          {props.label}
        </div>
        <div
          style={{
            display: "flex",
            flex: "0 0 auto",
            justifyContent: "flex-end",
            marginLeft: isRTL ? "0em" : "auto",
            marginRight: isRTL ? "auto" : "0em",
            minWidth: "30%",
          }}
        >
          {props.shortcuts.map((shortcut, index) => (
            <React.Fragment key={index}>
              <ShortcutKey>{shortcut}</ShortcutKey>
              {props.isOr &&
                index !== props.shortcuts.length - 1 &&
                t("shortcutsDialog.or")}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

Shortcut.defaultProps = {
  isOr: true,
};

const ShortcutKey = (props: { children: React.ReactNode }) => (
  <span
    style={{
      wordBreak: "keep-all",
      border: `1px solid ${oc.gray[4]}`,
      padding: "2px 8px",
      margin: "auto 4px",
      backgroundColor: oc.gray[2],
      borderRadius: "2px",
      fontSize: "0.8em",
      minHeight: "26px",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
    }}
    {...props}
  />
);

const Footer = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      borderTop: `1px solid ${oc.gray[4]}`,
      marginTop: 8,
      paddingTop: 16,
    }}
  >
    <a
      href="https://blog.excalidraw.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      {t("shortcutsDialog.blog")}
    </a>
    <a
      href="https://howto.excalidraw.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      {t("shortcutsDialog.howto")}
    </a>
    <a
      href="https://github.com/excalidraw/excalidraw/issues"
      target="_blank"
      rel="noopener noreferrer"
    >
      {t("shortcutsDialog.github")}
    </a>
  </div>
);

export const ShortcutsDialog = ({ onClose }: { onClose?: () => void }) => {
  const handleClose = React.useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <>
      <Dialog
        maxWidth={900}
        onCloseRequest={handleClose}
        title={t("shortcutsDialog.title")}
      >
        <Columns>
          <Column>
            <ShortcutIsland caption={t("shortcutsDialog.shapes")}>
              <Shortcut label={t("toolBar.selection")} shortcuts={["S", "1"]} />
              <Shortcut label={t("toolBar.rectangle")} shortcuts={["R", "2"]} />
              <Shortcut label={t("toolBar.diamond")} shortcuts={["D", "3"]} />
              <Shortcut label={t("toolBar.ellipse")} shortcuts={["E", "4"]} />
              <Shortcut label={t("toolBar.arrow")} shortcuts={["A", "5"]} />
              <Shortcut label={t("toolBar.line")} shortcuts={["L", "6"]} />
              <Shortcut label={t("toolBar.draw")} shortcuts={["X", "7"]} />
              <Shortcut label={t("toolBar.text")} shortcuts={["T", "8"]} />
              <Shortcut
                label={t("shortcutsDialog.textNewLine")}
                shortcuts={[
                  getShortcutKey("Enter"),
                  getShortcutKey("Shift+Enter"),
                ]}
              />
              <Shortcut
                label={t("shortcutsDialog.textFinish")}
                shortcuts={[
                  getShortcutKey("Esc"),
                  getShortcutKey("CtrlOrCmd+Enter"),
                ]}
              />
              <Shortcut
                label={t("shortcutsDialog.curvedArrow")}
                shortcuts={[
                  "A",
                  t("shortcutsDialog.click"),
                  t("shortcutsDialog.click"),
                  t("shortcutsDialog.click"),
                ]}
                isOr={false}
              />
              <Shortcut
                label={t("shortcutsDialog.curvedLine")}
                shortcuts={[
                  "L",
                  t("shortcutsDialog.click"),
                  t("shortcutsDialog.click"),
                  t("shortcutsDialog.click"),
                ]}
                isOr={false}
              />
              <Shortcut label={t("toolBar.lock")} shortcuts={["Q"]} />
            </ShortcutIsland>
            <ShortcutIsland caption={t("shortcutsDialog.view")}>
              <Shortcut
                label={t("buttons.zoomIn")}
                shortcuts={[getShortcutKey("CtrlOrCmd++")]}
              />
              <Shortcut
                label={t("buttons.zoomOut")}
                shortcuts={[getShortcutKey("CtrlOrCmd+-")]}
              />
              <Shortcut
                label={t("buttons.resetZoom")}
                shortcuts={[getShortcutKey("CtrlOrCmd+0")]}
              />
              <Shortcut
                label={t("shortcutsDialog.zoomToFit")}
                shortcuts={["Shift+1"]}
              />
              <Shortcut
                label={t("buttons.toggleFullScreen")}
                shortcuts={["F"]}
              />
              <Shortcut
                label={t("buttons.toggleZenMode")}
                shortcuts={[getShortcutKey("Alt+Z")]}
              />
              <Shortcut
                label={t("buttons.toggleGridMode")}
                shortcuts={[getShortcutKey("CtrlOrCmd+'")]}
              />
            </ShortcutIsland>
          </Column>
          <Column>
            <ShortcutIsland caption={t("shortcutsDialog.editor")}>
              <Shortcut
                label={t("labels.selectAll")}
                shortcuts={[getShortcutKey("CtrlOrCmd+A")]}
              />
              <Shortcut
                label={t("labels.moveCanvas")}
                shortcuts={[
                  getShortcutKey(`Space+${t("shortcutsDialog.drag")}`),
                  getShortcutKey(`Wheel+${t("shortcutsDialog.drag")}`),
                ]}
                isOr={true}
              />
              <Shortcut
                label={t("labels.copy")}
                shortcuts={[getShortcutKey("CtrlOrCmd+C")]}
              />
              <Shortcut
                label={t("labels.paste")}
                shortcuts={[getShortcutKey("CtrlOrCmd+V")]}
              />
              <Shortcut
                label={t("labels.copyAsPng")}
                shortcuts={[getShortcutKey("Shift+Alt+C")]}
              />
              <Shortcut
                label={t("labels.copyStyles")}
                shortcuts={[getShortcutKey("CtrlOrCmd+Shift+C")]}
              />
              <Shortcut
                label={t("labels.pasteStyles")}
                shortcuts={[getShortcutKey("CtrlOrCmd+Shift+V")]}
              />
              <Shortcut
                label={t("labels.delete")}
                shortcuts={[getShortcutKey("Del")]}
              />
              <Shortcut
                label={t("labels.sendToBack")}
                shortcuts={[
                  isDarwin
                    ? getShortcutKey("CtrlOrCmd+Alt+[")
                    : getShortcutKey("CtrlOrCmd+Shift+["),
                ]}
              />
              <Shortcut
                label={t("labels.bringToFront")}
                shortcuts={[
                  isDarwin
                    ? getShortcutKey("CtrlOrCmd+Alt+]")
                    : getShortcutKey("CtrlOrCmd+Shift+]"),
                ]}
              />
              <Shortcut
                label={t("labels.sendBackward")}
                shortcuts={[getShortcutKey("CtrlOrCmd+[")]}
              />
              <Shortcut
                label={t("labels.bringForward")}
                shortcuts={[getShortcutKey("CtrlOrCmd+]")]}
              />
              <Shortcut
                label={t("labels.duplicateSelection")}
                shortcuts={[
                  getShortcutKey("CtrlOrCmd+D"),
                  getShortcutKey(`Alt+${t("shortcutsDialog.drag")}`),
                ]}
              />
              <Shortcut
                label={t("buttons.undo")}
                shortcuts={[getShortcutKey("CtrlOrCmd+Z")]}
              />
              <Shortcut
                label={t("buttons.redo")}
                shortcuts={[getShortcutKey("CtrlOrCmd+Shift+Z")]}
              />
              <Shortcut
                label={t("labels.group")}
                shortcuts={[getShortcutKey("CtrlOrCmd+G")]}
              />
              <Shortcut
                label={t("labels.ungroup")}
                shortcuts={[getShortcutKey("CtrlOrCmd+Shift+G")]}
              />
            </ShortcutIsland>
          </Column>
        </Columns>
        <Footer />
      </Dialog>
    </>
  );
};
