// const wpBlockEditor = undefined === wp.blockEditor ? wp.editor : wp.blockEditor;
// { registerFormatType, toggleFormat, getActiveFormat, applyFormat, removeFormat } = wp.richText,
// { withState, createHigherOrderComponent } = wp.compose,

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { withSelect, useSelect, useDispatch } from '@wordpress/data';
import {
	Slot,
	Fill,
	Icon,
	SVG,
	Path,
	PanelRow,
	PanelHeader,
	TabPanel,
	PanelBody,
	BaseControl,
	Tooltip,
	Toolbar,
	ToolbarButton,
	DropdownMenu,
	Button,
	ButtonGroup,
	CheckboxControl,
	RadioControl,
	SelectControl,
	TreeSelect,
	TextControl,
	TextareaControl,
	FormToggle,
	ToggleControl,
	ColorPicker,
	ColorPalette,
	RangeControl,
	Popover,
	IconButton,
	FocalPointPicker,
	FontSizePicker,
	Dashicon,
} from '@wordpress/components';

import {
	RichText,
	InnerBlocks,
	InspectorControls,
	URLInput,
	URLPopover,
	AlignmentToolbar,
	BlockAlignmentToolbar,
	BlockVerticalAlignmentToolbar,
	BlockControls,
	BlockFormatControls,
	RichTextShortcut,
	RichTextToolbarButton,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
	MediaPlaceholder,
	PlainText,
	getColorClassName,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
} from '@wordpress/block-editor';

import {
	Fragment,
	Component,
	createContext,
	useState,
	useMemo,
	useCallback,
	RawHTML,
} from '@wordpress/element';

import ServerSideRender from '@wordpress/server-side-render';
