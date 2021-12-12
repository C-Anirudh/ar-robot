/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(['require', 'exports', 'preact', 'ojs/ojmetadatautils', 'ojs/ojcustomelement-utils', 'ojs/ojcore-base', 'ojs/ojpreact-patch', 'ojs/ojtrace-event'], function (require, exports, preact, MetadataUtils, ojcustomelementUtils, oj, ojpreactPatch, ojtraceEvent) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) { return e; } else {
            var n = {};
            if (e) {
                Object.keys(e).forEach(function (k) {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                });
            }
            n['default'] = e;
            return n;
        }
    }

    oj = oj && Object.prototype.hasOwnProperty.call(oj, 'default') ? oj['default'] : oj;

    /**
     * Class decorator for VComponent custom elements. Takes the tag name
     * of the custom element.
     * @param {string} tagName The custom element tag name
     * @name customElement
     * @function
     * @ojexports
     * @memberof ojvcomponent
     * @ojdecorator
     */

    /**
     * Method decorator for VComponent methods that should be exposed on the custom element.
     * Non decorated VComponent methods will not be made available on the custom element.
     * @name method
     * @function
     * @ojexports
     * @memberof ojvcomponent
     * @ojdecorator
     */

    /**
     * @ojmodulecontainer ojvcomponent
     * @ojhidden
     * @since 11.0.0
     * @ojtsimport {module: "ojmetadata", type: "AMD", importName:"MetadataTypes"}
     * @classdesc
     * <p>The VComponent API is a mechanism for creating virtual DOM-based
     * Web Components.  VComponents are authored in TypeScript as
     * <a href="https://preactjs.com/">Preact</a> class-based
     * components, with the custom element tag name specified via the
     * <a href="#customElement">&#64;customElement</a> decorator:
     * </p>
     * <pre class="prettyprint"><code>import { h, Component, ComponentChild } from 'preact';
     * import { customElement, GlobalProps } from 'ojs/ojvcomponent';
     *
     * &#64;customElement('oj-hello-world')
     * export class HelloWorld extends Component&lt;GlobalProps&gt; {
     *   render(): ComponentChild {
     *     return &lt;div&gt;Hello, World!&lt;/div&gt;;
     *   }
     * }
     * </code></pre>
     * <p>
     *   In order to prepare the component for use, the VComponent must be run
     *   through the <a href="https://www.npmjs.com/package/@oracle/ojet-cli">ojet
     *   CLI</a> build process.  Running <code>ojet build</code> will do the
     *   following:
     * </p>
     * <ul>
     *   <li>Inject necessary information into the module to enable Web Component
     *   usage.</li>
     *   <li>Generate a type definition that includes Web Component type info.</li>
     *   <li>Generate a component.json metadata file for enabling integration
     *   with <a href="https://developer.oracle.com/visual-builder/">Oracle
     *   Visual Builder</a></li>
     * </ul>
     * <p>
     *   Once the VComponent has been built, it can either be consumed as a
     *   plain old Web Component in HTML content, for example:
     * </p>
     * <pre class="prettyprint"><code>&lt;!-- This is HTML: --&gt;
     * &lt;oj-hello-world&gt;&lt;/oj-hello-world&gt;
     * </code></pre>
     * <p>
     *   Or via the Preact component class in JSX:
     * </p>
     * <pre class="prettyprint"><code>// This is JSX:
     * const hw =  &lt;HelloWorld /&gt;
     * </code></pre>
     * <p>
     *   These both produce the same DOM content.  That is, in both cases, an
     *   &lt;oj-hello-world&gt; custom element is created and added to the DOM.  In
     *   the case where the VComponent is referenced via its Preact component
     *   class, this custom element is automatically created and wrapped around
     *   the rendered content (the &lt;div&gt; in the above example) by the
     *   VComponent framework.
     * </p>
     * <h3 id="creating">
     *  Creating VComponents
     *  <a class="bookmarkable-link" title="Bookmarkable Link" href="#creating"></a>
     * </h3>
     * <p>
     *   VComponents can be created either by hand or via the ojet
     *   CLI's "create component" command, for example:
     * </p>
     * <pre class="prettyprint"><code>$ ojet create component oj-hello-world --vcomponent
     * </code></pre>
     * <p>
     *   When running the <code>ojet create component</code> commmand, the custom
     *   element tag name is specified as an argument, and the --vcomponent flag
     *   indicates that a VComponent (as opposed to a Composite Component) should
     *   be created.
     * </p>
     * <p>
     *   (Note: if the application was originally created using the --vdom
     *   flag, the <code>ojet create component</code> command will default to
     *   creating VComponents and the --vcomponent flag can be omitted.
     * </p>
     * <p>
     * The ojet create component command creates some
     * supporting artifacts, including:
     * </p>
     * <ul>
     *   <li>A loader module</li>
     *   <li>A style sheet and SASS files for theming</li>
     *   <li>A resource module for translated strings</li>
     * </ul>
     * <p>
     *   In addition, ojet will ensure that the path to the VComponent is
     *   properly configured in the application's tsconfig.json
     * </p>
     * <h3 id="properties">
     *  Properties
     *  <a class="bookmarkable-link" title="Bookmarkable Link" href="#properties"></a>
     * </h3>
     * <p>
     *   VComponents/Preact components declare their supported properties
     *   via a type parameter. For example, as we saw above:
     * </p>
     * <pre class="prettyprint"><code>export class HelloWorld extends Component&lt;GlobalProps&gt; {
     * </code></pre>
     * <p>
     *   With this declaration, the component indicates that it supports
     *   the properties specified via the
     *   <a href="#GlobalProps">GlobalProps</a> type.  This type
     *   includes a subset of the
     *   <a href="https://html.spec.whatwg.org/#global-attributes">
     *   global HTML attributes</a> which represent
     *   the minimally required set of properties that all VComponents
     *   must support.
     * </p>
     * <p>
     *   VComponents can, of course, expose other non-global,
     *   component-specific properties as well.  This is typically done by
     *   declaring a type alias:
     * </p>
     * <pre class="prettyprint"><code>type Props = {
     *   greeting?: string;
     *   name?: string;
     * }
     * </code></pre>
     * <p>
     *   And associating this type with the first type parameter in the
     *   <a href="https://preactjs.com/guide/v10/api-reference#component">
     *   Component</a> class declaration.
     * </p>
     * <p>
     *   Since VComponents are minimally required to support the
     *   global HTML attributes defined by GlobalProps, the
     *   component-specific props must be combined with GlobalProps.  The
     *   VComponent API includes a utility type to help with this:
     *   <a href="#ExtendGlobalProps">ExtendGlobalProps</a>.
     *   Using ExtendGlobalProps, a component with
     *   the above Props type (including some default values) ends up looking like:
     * </p>
     * <pre class="prettyprint"><code>import { h, Component, ComponentChild } from 'preact';
     * import { customElement, ExtendGlobalProps } from 'ojs/ojvcomponent';
     *
     * type Props = {
     *   greeting?: string;
     *   name?: string;
     * }
     *
     * &#64;customElement('oj-hello-world-with-props')
     * export class HelloWorld extends Component&lt;ExtendGlobalProps&lt;Props&gt;&gt; {
     *   render(props: Readonly&lt;Props&gt;): ComponentChild {
     *     const { greeting, name } = props;
     *
     *     return &lt;div&gt;{ greeting }, { name }!&lt;/div&gt;;
     *   }
     *
     *   static defaultProps: Props = {
     *     greeting: "Hello",
     *     name: "World"
     *   };
     * }
     * </code></pre>
     * <p>
     *   In Preact, properties can be accessed either through this.props
     *   or via the first argument of the render method.
     * </p>
     * <p>
     *   Properties can be set on the component in various ways, including:
     * </p>
     * <ol>
     *   <li>As attributes in HTML markup</li>
     *   <li>As properties in JSX</li>
     *   <li>As properties on the DOM element</li>
     * </ol>
     * <p>
     *   One note on naming conventions: when referencing properties within JSX
     *   or on a DOM element (#2 and #3), the property name as specified in the
     *   component type is always used.
     * </p>
     * <p>
     *   However, for attributes in HTML markup (#1), JET uses a different
     *   naming convention for multi-word attributes.  As discussed in
     *   <a href="CustomElementOverview.html#ce-proptoattr-section">
     *   Property-to-Attribute Mapping</a>, JET converts camelCased property names
     *   into hyphen-separated, kebab-case attribute names.  As such, given the
     *   following property:
     * </p>
     * <pre class="prettyprint"><code>type Props = {
     *     preferredGreeting?: string;
     * }
     * </code></pre>
     * <p>
     *   The attribute name "preferred-greeting" is used in HTML markup:
     * </p>
     * <pre class="prettyprint"><code>&lt;!-- This is HTML --&gt;
     * &lt;oj-hello-world preferred-greeting="Hi"&gt;&lt;/oj-hello-world&gt;
     * </code></pre>
     * <p>
     *   And the unmodified property name is used everywhere else:
     * </p>
     * <pre class="prettyprint"><code>// This is JSX
     * function Parent() {
     *   return &lt;HelloWorld preferredGreeting="Hi" /&gt;
     * }
     *
     * // This is also JSX
     * function ParentOfCustomElement() {
     *   return &lt;oj-hello-world preferredGreeting="Hi" /&gt;
     * }
     *
     * // This is plain old DOM
     * const helloWorld = document.createElement("oj-hello-world");
     * helloWorld.preferredGreeting = "Hi";
     * </code></pre>
     * </p>
     * <h3 id="children">
     *  Children and Slots
     *  <a class="bookmarkable-link" title="Bookmarkable Link" href="#children"></a>
     * </h3>
     * <p>
     *   Many Web Components allow children to be specified, either as
     *   direct children or via named
     *   <a href="CustomElementOverview.html#ce-slots-section">slots</a>.
     *   A VComponent indicates
     *   that it takes arbitrary (non-named) children by declaring a "children"
     *   property using Preact's ComponentChildren type.  Named slots are
     *   declared in a similar fashion, using the
     *   VComponent-specific <a href="#Slot">Slot</a> type:
     * </p>
     * <pre class="prettyprint"><code>import { h, Component, ComponentChildren } from 'preact';
     * import { customElement, ExtendGlobalProps, Slot } from 'ojs/ojvcomponent';
     *
     * type Props = {
     *   // This indicates that the VComponent accepts arbitrary
     *   // (non-slot) children:
     *   children?: ComponentChildren;
     *
     *   // And this indicates that the VComponent accepts a
     *   // slot named "start"
     *   start?: Slot;
     * }
     * </code></pre>
     * <p>
     *   Both children and slots can be embedded directly in a virtual DOM
     *   tree:
     * </p>
     * <pre class="prettyprint"><code>  render(props: Readonly&lt;Props&gt;): ComponentChild {
     *     return (
     *       &lt;div&gt;
     *         // Place the start slot before our greeting
     *         { props.start }
     *
     *         Hello, World!
     *
     *         &lt;div&gt;
     *           // And dump any other children in a wrapper div
     *           { props.children }
     *         &lt;/div&gt;
     *       &lt;/div&gt;
     *     );
     *   }
     * </code></pre>
     * <p>
     *   In cases where the VComponent needs to inspect children or
     *   slot content, these values must first be normalized to a
     *   flattened array by calling Preact's
     *   <a href="https://preactjs.com/guide/v10/api-reference/#tochildarray">
     *   toChildArray</a>.
     * </p>
     * <p>
     *   When consuming the VComponent as a custom element, slots are
     *   specified using the slot attribute:
     * </p>
     * <pre class="prettyprint"><code>      &lt;!-- This is HTML --&gt;
     *       &lt;oj-hello-world-with-children&gt;
     *         &lt;!-- This is the start slot content: --&gt;
     *         &lt;oj-avatar slot="start" initials="HW"&gt;&lt;/oj-avatar&gt;
     *
     *         &lt;!-- This is other child content: --&gt;
     *         &lt;span&gt;Child content&lt;/span&gt;
     *       &lt;/oj-hello-world-with-children&gt;
     * </code></pre>
     * <p>
     *   However, when referencing the VComponent as a Preact component,
     *   slots are configured as plain old component properties:
     * </p>
     * <pre class="prettyprint"><code>function Parent() {
     *   return (
     *     &lt;HelloWorldWithChildren start={ &lt;oj-avatar initials="OJ" /&gt; }&gt;
     *       &lt;span&gt;Child content&lt;/span&gt;
     *     &lt;/HelloWorldWithChildren&gt;
     *   )
     * }
     * </code></pre>
     * <h3 id="template-slots">
     *  Template Slots
     *  <a class="bookmarkable-link" title="Bookmarkable Link" href="#template-slots"></a>
     * </h3>
     * <p>
     *   As with other JET components, VComponents can expose
     *   <a href="CustomElementOverview.html#ce-slots-template-section">
     *   template slots.</a>
     *   Template slots differ from plain old slots in that they are invoked
     *   with some context.  Template slots are most commonly used within
     *   iterating "collection" components, which need to stamp out some bit of
     *   content corresponding to each value/row/item in a data set.
     * </p>
     * <p>
     *   Like other slots, template slots are declared as properties.  Rather
     *   than using the Slot type, the <a href="#TemplateSlot">TemplateSlot</a>
     *   type is used:
     * </p>
     * <pre class="prettyprint"><code>import { h, Component } from "preact";
     * import { customElement, ExtendGlobalProps, TemplateSlot } from "ojs/ojvcomponent";
     *
     * type Props = {
     *   // This indicates that the VComponent exposes a template
     *   // slot named "itemTemplate":
     *   itemTemplate?: TemplateSlot&lt;ItemContext&gt;;
     * }
     *
     * // This is the type for the context that we'll
     * // pass into the itemTemplate slot
     * type ItemContext = {
     *   index?: number;
     *   label?: string;
     *   value?: string;
     * }
     * </code></pre>
     * <p>
     *   TemplateSlot is a function type that takes a single  parameter:
     *   the context that is passed in when the template slot is
     *   rendered.  The VComponent invokes the template slot function
     *   with this context and embeds the results in the virtual DOM tree:
     * </p>
     * <pre class="prettyprint"><code>// Invoke the template slot and embed the results
     * // in a list item:
     * &lt;li&gt; {
     *   props.itemTemplate?.({
     *     index: currentIndex,
     *     label: currentLabel,
     *     value: currentValue
     *   })
     * }
     * &lt;/li&gt;
     * </code></pre>
     * <h3 id="actions">
     *  Actions and Events
     *  <a class="bookmarkable-link" title="Bookmarkable Link" href="#actions"></a>
     * </h3>
     * <p>
     *   As with other types of Web Components, VComponents can be the source
     *   of events, typically fired in response to some user interaction.
     *   VComponents specify their event contracts by declaring properties of
     *   the form "on&lt;PascalCaseEventName&gt;" of type
     *   <a href="#Action">Action</a>.  For example, the
     *   following declaration indicates that the component fires a
     *   "greetingComplete" event:
     * </p>
     * <pre class="prettyprint"><code>import { customElement, ExtendGlobalProps, Action } from 'ojs/ojvcomponent';
     *
     * type Props = {
     *   onGreetingComplete?: Action;
     *
     *   // Other component props...
     * }
     * </code></pre>
     * <p>
     *   Action is a function type that optionally takes an argument
     *   representing the event detail payload.  For events that include a
     *   detail payload, the detail type is specified via a type parameter:
     * </p>
     * <pre class="prettyprint"><code>type Detail = {
     *   status: "success" | "failure";
     * }
     *
     * type Props = {
     *   onGreetingComplete?: Action&lt;Detail&gt;;
     * }
     * </code></pre>
     * <p>
     *   The VComponent triggers the event by invoking the Action property and
     *   providing the detail payload:
     * </p>
     * <pre class="prettyprint"><code>  this.props.onGreetingComplete?.({ status: "success"});
     * </code></pre>
     * <p>
     *   When used in custom element form, this dispatches an
     *   actual DOM
     *   <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent">
     *   CustomEvent</a>.  See the
     *   <a href="CustomElementOverview.html#ce-events-section">Events and
     *   Listeners</a> topic for
     *   details on how to respond to these events.
     * </p>
     * <p>
     *   By default, events that are dispatched by the VComponent framework do
     *   not bubble.  See the <a href="#Bubbles">Bubbles</a> type for info on
     *   how to declare bubbling events.
     * </p>
     * <p>
     *   When consumed as a Preact component, no DOM events are created or
     *   dispatched.  Instead, the Action callback is simply invoked directly.
     *   There is no automatic event bubbling-like behavior in this case.
     * </p>
     * <p>
     *  The VComponent API also supports a contract for actions/events that
     *  can be vetoed by the consumer.  See the
     *  <a href="#CancelableAction">CancelableAction</a> type for details.
     * </p>
     * <h3 id="methods">
     *  Methods
     *  <a class="bookmarkable-link" title="Bookmarkable Link" href="#methods"></a>
     * </h3>
     * <p>
     *  Some Web Components need to expose non-standard, component specific
     *  methods on their custom elements.  For example, the
     *  <a href="oj.ojPopup.html">&lt;oj-popup&gt;</a>
     *  custom element exposes
     *  <a href="oj.ojPopup.html#open">open</a>,
     *  <a href="oj.ojPopup.html#isOpen">isOpen</a> and
     *  <a href="oj.ojPopup.html#close">close</a> methods.
     * </p>
     * <p>
     *  While it is preferable to favor declarative, property-driven APIs over
     *  imperative, method-centric contracts, the VComponent API does allow
     *  components to expose methods on their custom elements.
     * </p>
     * <p>
     *  By default, no methods defined on the VComponent's class are surfaced
     *  on the custom element.  To indicate that a VComponent method should be
     *  included in the custom element's API, simply mark the method with the
     *  <a href="#method">&#64;method</a> decorator.
     * </p>
     * <h3 id="writeback">
     *  Writeback Properties
     *  <a class="bookmarkable-link" title="Bookmarkable Link" href="#writeback"></a>
     * </h3>
     * <p>
     *   JET-based Web Components support a mechanism by which components can
     *   trigger changes to their own properties.  For example, the JET input
     *   and select components notify consumers of changes to the value
     *   property as the user enters new values.  When combined with two-way
     *   binding, this can be used to update values referenced via JET binding
     *   expressions.  This process is known as "writeback".  See the
     *   <a href="CustomElementOverview.html#ce-databind-writeback-section">
     *   Writeback</a> section in the
     *   <a href="CustomElementOverview.html">JET Web Components</a> topic
     *   for background.
     * </p>
     * <p>
     *   VComponents declare writeback properties by pairing a normal property
     *   declaration with a companion callback property that is invoked when the
     *   component wants to trigger a writeback.  For example, this plain old
     *   (non-writeback) value property:
     * </p>
     * <pre class="prettyprint"><code>type Props = {
     *
     *   // This is a plain old (non-writeback) value property:
     *   value?: string;
     * }
     * </code></pre>
     * <p>
     *   Can be converted into a writeback by adding a second property named
     *   "onValueChanged":
     * </p>
     * <pre class="prettyprint"><code>import { customElement, ExtendGlobalProps, PropertyChanged } from "ojs/ojvcomponent";
     *
     * type Props = {
     *   value?: string;
     *
     *   // The presence of this callback promotes "value" into a
     *   // writeback property
     *   onValueChanged?: PropertyChanged&lt;string&gt;;
     * }
     * </code></pre>
     * <p>
     *   Both the event name and type are significant.  In order to be
     *   recognizable as a writeback property, the companion callback property
     *   must follow the naming convention "on&lt;PropertyName&gt;Changed" and must
     *   be of type <a href="#PropertyChanged">PropertyChanged</a>.
     * </p>
     * <p>
     *   Similar to Actions, invoking a PropertyChanged callback has different
     *   implications depending on whether the VComponent is being consumed as
     *   a custom element or as a Preact component.
     * </p>
     * <p>
     *   When the VComponent is used in its custom element form, invoking the
     *   PropertyChanged callback results in an actual DOM
     *   <a href="CustomElementOverview.html#ce-properties-changed-section">
     *   propertyChanged event</a>
     *   being created and dispatched.  This allows JET's two-way binding
     *   mechanism to kick in.  If the property is configured with a two-way
     *   binding, the new value will be written back into the expression.
     * </p>
     * <p>
     *   In addition, when used as a custom element, triggering a writeback
     *   automatically queues a render of the VComponent, allowing the
     *   VComponent to re-render with the new value.
     * </p>
     * <p>
     *   When the VComponent is used via its Preact component class, no DOM
     *   event is created or dispatched.  Instead, the PropertyChanged callback
     *   is simply invoked with the new value.  The parent component is then
     *   responsible for deciding whether re-render with the new value or not.
     * </p>
     * <p>
     *   The VComponent API also supports writeback properties which can be
     *   read/observed by the consumer, but are only ever written by the
     *   component itself.  These are known as
     *   <a href="CustomElementOverview.html#ce-properties-readonlywriteback-section">
     *   read-only writeback properties</a>.
     *   See the <a href="#ElementReadOnly">ElementReadOnly<a> type for info on how
     *   to configure these properties.
     * </p>
     * <h3 id="observed">
     *  Observed Global Properties
     *  <a class="bookmarkable-link" title="Bookmarkable Link" href="#observed"></a>
     * </h3>
     * <p>
     *   As discussed above, all VComponents minimally support the set of
     *   global HTML attributes defined by the GlobalProps/ExtendGlobalProps
     *   types.  This means that when consuming a VComponent either via its
     *   custom element tag or VComponent class, global attributes (e.g., id,
     *   tabIndex, title, etc...) can be specified:
     * </p>
     * <pre class="prettyprint"><code>function Parent() {
     *   // We can pass GlobalProps like id into any VComponent:
     *   return &lt;HelloWorld id="hw" /&gt;
     * }
     * </code></pre>
     * <p>
     *   The VComponent framework automatically transfers any global properties
     *   through to the underlying custom element in the DOM.
     * <p>
     *   In some cases, the VComponent implementation may need to inspect the
     *   values of these global properties.  In addition, VComponents may need
     *   to respond by re-rendering themselves when a global property is
     *   modified on the custom element.  In such cases, VComponents can
     *   express interest in specific global properties via the
     *   <a href="#ObservedGlobalProps">ObservedGlobalProps</a>
     *   utility type.  This type allows specific global
     *   properties to be selected for observation via a type parameter.  This
     *   type is combined with the component's other properties as part of the
     *   property declaration.
     * </p>
     * <p>
     *   The following property declaration indicates that the component
     *   exposes "greeting" and "name" properties and also observes the global
     *   "id" and "tabIndex" props:
     * </p>
     * <pre class="prettyprint"><code>import { customElement, ExtendGlobalProps, ObservedGlobalProps } from 'ojs/ojvcomponent';
     *
     * type Props = {
     *   greeting?: string;
     *   name?: string;
     * } & ObservedGlobalProps&lt;'id' | 'tabIndex'&gt;
     * </code></pre>
     * <p>
     *   Any props that are specified via ObservedGlobalProps are automatically
     *   included in the custom element's observed attributes set.  As a
     *   result, any mutations to the one of these attributes on the custom
     *   element will automatically trigger a re-render of the VComponent with
     *   the new values.
     * </p>
     * <h3 id="root-element">
     *  Root Element
     *  <a class="bookmarkable-link" title="Bookmarkable Link" href="#root-element"></a>
     * </h3>
     * <p>
     *   In all of the VComponents that we have seen so far, the root custom
     *   element is not included in the rendered output.  Instead, this element
     *   is implicitly injected into the DOM by the VComonent framework.
     * </p>
     * <p>
     *   In some rare cases, it may be necessary to have more control over how
     *   the the root element is rendered.
     * </p>
     * <p>
     *   For example, consider this case of a VComponent that renders a link:
     * </p>
     * <pre class="prettyprint"><code>import { customElement, ExtendGlobalProps, ObservedGlobalProps } from "ojs/ojvcomponent";
     * import { h, Component, ComponentChild } from "preact";
     *
     * type Props = {
     *   href?: string;
     * } & ObservedGlobalProps&lt;'tabIndex'&gt;;
     *
     * &#64;customElement("oj-demo-link")
     * export class OjDemoLink extends Component&lt;ExtendGlobalProps&lt;Props&gt;&gt; {
     *
     *   render(props: Props): ComponentChild {
     *     return &lt;a href={ props.href } tabIndex={ props.tabIndex }&gt;Hello, World&lt;/a&gt;;
     *   }
     * }
     * </code></pre>
     * <p>
     *   The intent is that the value of the global tabIndex attribute will be
     *   transferred from the root element down to the link.
     * </p>
     * <p>
     *   However, since the tabIndex value will be automatically rendered on
     *   the root custom element, we end up with the tabIndex on two elements:
     *   on the root &lt;oj-demo-link&gt; and on the &lt;a&gt;.
     * </p>
     * <p>
     *   To address this, we can update the render method to render both the
     *   link *and* the root custom element.  The VComponent API includes a
     *   simple component that acts as a placeholder for the root element,
     *   named "Root".  The <a href="#Root">Root</a> component is exported from the
     *   "ojs/ojvcomponent" module, so we add this in our import list:
     * </p>
     * <pre class="prettyprint"><code>import { customElement, ExtendGlobalProps, ObservedGlobalProps, Root } from "ojs/ojvcomponent";
     * </code></pre>
     * <p>
     *   And then we can include the Root component in the virtual DOM tree,
     *   adjusting exactly which properties are rendered:
     * </p>
     * <pre class="prettyprint"><code>  render(props: Props): ComponentChild {
     *     return (
     *       // Suppress the tabIndex on the root custom element since
     *       // we are transferring this to the link
     *       &lt;Root tabIndex={ -1 }&gt;
     *
     *         // Render the tabIndex here:
     *         &lt;a href={ props.href } tabIndex={ props.tabIndex }&gt;Hello, World&lt;/a&gt;
     *       &lt;/Root&gt;
     *     );
     *   }
     * </code></pre>
     * <p>
     *   The presence of the Root component impacts how global properties are
     *   managed.  When the Root component is omitted, all global properties,
     *   both observed and non-observed, are automatically passed through to the
     *   root custom element.  When the Root component is included at the root
     *   of the rendered virtual DOM tree, non-observed global properties are
     *   still passed through to the root custom element.  However only those
     *   observed global properties that are explicitly rendered on the Root
     *   component will be passed through.
     * </p>
     */

    // TYPEDEFS

    /**
     * <p>
     *  The Action type is used to identify properties as action callbacks.
     *  Actions are functions that the VComponent invokes when it wants to
     *  communicate some activity to the outside world.  When the VComponent
     *  is being consumed as a custom element, this results in an actual DOM
     *  <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent">
     *  CustomEvent</a> being dispatched.  Alternatively, when the VComponent is
     *  referenced via its Preact Component class, the provided callback is
     *  invoked directly and no CustomEvent is produced.
     * </<p>
     * <p>
     *  Actions have an optional detail type.  If specified, the detail value
     *  is either passed to the consumer via the CustomEvent detail payload
     *  for the custom element case, or directly into the callback for the
     *  Preact component case.
     * </p>
     * <p>
     *  Note that Action properties must adhere to a specific naming
     *  convention: "on&lt;PascalCaseEventName&gt;".  For the custom element case,
     *  the type of the CustomEvent will be derived by converting the first
     *  character of the event name to lower case.  Thus, the
     *  "onGreetingComplete" property will generate a CustomEvent of type
     *  "greetingComplete".
     * </p>
     * <p>
     *  See <a href="#actions">Actions and Events</a> for more info.
     * </p>
     * @typedef {Function} Action
     * @ojexports
     * @memberof ojvcomponent
     * @ojsignature [{target:"Type", value:"<Detail extends object = {}>", for:"genericTypeParameters"},
     *               {target: "Type", value: "(detail?: Detail) => void"}]
     */

    /**
     * <p>
     *  As discussed in <a href="#actions">Actions and Events</a>,  the custom
     *  events generated by Actions do not bubble by default.  The
     *  Bubbles marker type can be combined with the <a href="#Action">Action</a>
     *  type to indicate that the Action's custom events should bubble.
     * </p>
     * <pre class="prettyprint"><code>type Props = {
     *   // This action generates bubbling custom events
     *   onThisActionBubbles?: Action & Bubbles;
     *
     *   // This action generates non-bubbling custom events
     *   onThisActionDoesNotBubble?: Action;
     * }
     * </code></pre>
     * @typedef {Object} Bubbles
     * @ojexports
     * @memberof ojvcomponent
     */

    /**
     * <p>
     *   Some JET Web Components support an asynchronous, event-based
     *   cancelation contract where prior to performing some operation, the
     *   component dispatches a "cancelable" event.  If the application cancels
     *   the event, the operation is not performed.  The
     *   <a href="oj.ojFilePicker.html">&lt;oj-file-picker&gt;</a>'s
     *   <a href="oj.ojFilePicker.html#event:beforeSelect">ojBeforeSelect</a>
     *   event is one example of such an API.
     * </p>
     * <p>
     *   The VComponent API has built-in support for this pattern via the
     *   CancelableAction type.  Like the plain old <a href="#Action">Action</a>
     *   type, CancelableAction is a function type that is used for defining
     *   callback-centric properties.  One key difference between these types
     *   is that CancelableAction returns a Promise.  If the Promise resolves
     *   successfully, the action is considered to be accepted.  If the Promise
     *   is rejected, the action is canceled.
     * </p>
     * <p>
     *   As with Action-typed properties, CancelableActions exhibit different
     *   behavior depending on whether the VComponent is being consumed as a
     *   custom element or via its Preact Component class.
     * </p>
     * <p>
     *   When consumed as a custom element, invoking a CancelableAction results
     *   in a CustomEvent being created and dispatched.  The detail payload of
     *   this custom event is augmented with one extra field: an "accept"
     *   method.  The accept method takes a single argument: the Promise that
     *   produces the cancelation result.
     * </p>
     * <p>
     *   When consumed via the Preact Component class, no custom event is
     *   dispatched.  Instead, the callback returns the cancelation promise
     *   directly.
     * </p>
     * @typedef {Function} CancelableAction
     * @ojexports
     * @memberof ojvcomponent
     * @ojsignature [{target:"Type", value:"<Detail extends object = {}>", for:"genericTypeParameters"},
     *               {target: "Type", value: "(detail?: Detail) => Promise<void>"}]
     */

    /**
     * <p>
     *   In most cases when a Web Component accepts slot content, the number
     *   and names of the slots are known, as these are defined by the
     *   component's public API.  However, in some cases components may allow
     *   an arbitrary number of slots to be specified, where the slot names are not
     *   known up front.  The &lt;oj-switcher&gt; component
     *   is an example of a component that accepts a dynamically defined
     *   (rather than predefined) set of slots.
     * </p>
     * <p>
     *   The VComponent API supports such cases via the DynamicSlots and
     *   <a href="#DynamicTemplateSlots">DynamicTemplateSlots</a> types.  A
     *   single property can be marked with the DynamicSlots type:
     * </p>
     * <pre class="prettyprint"><code>type Props = {
     *
     *   // This property will be populated with all
     *   // "unknown" slots.
     *   items?: DynamicSlots;
     *
     *   // Other properties go here...
     * }
     * </code></pre>
     * <p>
     *   When the VComponent is consumed in custom element form, this property
     *   will be populated with entries for each "dynamic" slot.  That is,
     *   an entry will be added for each child element with a slot attribute that
     *   does not correspond to a known  Slot-typed property.
     *   The property acts as a map from slot name to <a href="#Slot">Slot</a>
     *   instance.  The VComponent can use whatever heuristic it prefers to
     *   decide which (if any) slots should be included in the rendered output.
     * </p>
     * @typedef {Object} DynamicSlots
     * @ojexports
     * @memberof ojvcomponent
     * @ojsignature [{target: "Type", value: "Record<string, VComponent.Slot>" }]
     */

    /**
     * <p>
     *  The DynamicTemplateSlots type is a companion to
     *  <a href="#DynamicSlots">DynamicSlots</a> that is
     *  used in cases where the component accepts an arbitrary number of
     *  <a href="#template-slots">template slots</a>.  VComponents may declare a
     *  single property of type DynamicTemplateSlots.  When the component is used as
     *  a custom element, this property will be populated with one entry for each
     *  "dynamic" template slot, where the key is the slot name and the value is a
     *  <a href="#TemplateSlot">TemplateSlot</a> function.
     * </p>
     * <p>
     *   Note that each VComponent class can only contain a single dynamic
     *   slot property.  That is, each VComponent can have one property
     *   of type DynamicSlots or one property of type DynamicTemplateSlots, but
     *   not both.
     * </p>
     * @typedef {Object} DynamicTemplateSlots
     * @ojexports
     * @memberof ojvcomponent
     * @ojsignature [{target:"Type", value:"<Data>", for:"genericTypeParameters"},
     *               {target: "Type", value: "Record<string, VComponent.TemplateSlot<Data>>" }]
    */

    /**
     * <p>
     *   By default, writeback property mutations can be driven either by the
     *   component, typically in response to some user interaction, or by the
     *   consumer of the component.  In some cases, writeback properties are
     *   exclusively mutated by the component itself.  Writeback properties
     *   that cannot be mutated by the consumer are known as
     *   <a href="CustomElementOverview.html#ce-properties-readonlywriteback-section">
     *   read-only writeback properties</a>.  The
     *   <a href="oj.ojInputText.html">&lt;oj-input-text&gt;</a>'s
     *   <a href="oj.ojInputText.html#rawValue">rawValue</a> property is an
     *   example of such a property.
     * </p>
     * <p>
     *   Read-only writeback properties are declared in a similar manner to
     *   <a href="#writeback">plain old writeback properties</a>, with one important
     *   difference: the ElementReadOnly utility type is used as a marker to
     *   identify the that the property is read-only.
     * </p>
     * <p>
     *   Declarations for both forms of writeback properties can be seen below:
     * </p>
     * <pre class="prettyprint"><code>type Props = {
     *
     *   // This is a normal writeback property:
     *   value?: string;
     *   onValueChanged?: PropertyChanged&lt;string&gt;
     *
     *   // This is a read-only writeback property:
     *   rawValue?: ElementReadOnly&lt;string&gt;;
     *   onRawValueChanged?: PropertyChanged&lt;string&gt;
     * }
     * </code></pre>
     * @typedef {Object} ElementReadOnly
     * @ojexports
     * @memberof ojvcomponent
     * @ojsignature [{target:"Type", value:"<T>", for:"genericTypeParameters"},
     *               {target: "Type", value: "T"}]

     */

    /**
     * <p>
     *   As discussed in the <a href="#properties">Properties</a> section,
     *   all VComponents must minimally include the
     *   <a href="#GlobalProps">GlobalProps</a> in their property types.
     *   ExtendGlobalProps is a convenience type for combining component-specific
     *   properties with GlobalProps, e.g.:
     * </p>
     * <pre class="prettyprint"><code>import { customElement, ExtendGlobalProps } from 'ojs/ojvcomponent';
     *
     * // These are the component-specific props:
     * type Props = {
     *   greeting?: string;
     *   name?: string;
     * }
     *
     * // Below we merge the component props with the
     * // global props using ExtendGlobalProps
     * &#64;customElement('oj-hello-world-with-props')
     * export class HelloWorld extends Component&lt;ExtendGlobalProps&lt;Props&gt;&gt; {
     * </code></pre>
     * @typedef {Object} ExtendGlobalProps
     * @ojexports
     * @memberof ojvcomponent
     * @ojsignature [{target:"Type", value:"<Props>", for:"genericTypeParameters"},
     *               {target: "Type", value: "Readonly<Props> & GlobalProps"}]
     */

    /**
     * <p>
     *   The GlobalProps type defines the set of global properties that are
     *   supported by all VComponents.  This includes three categories of
     *   properties:
     * </p>
     * <ol>
     *   <li><a href="https://html.spec.whatwg.org/#global-attributes">
     *   Global HTML attributes</a></li>
     *   <li><a href="https://www.w3.org/TR/wai-aria-1.1/#state_prop_def">ARIA
     *     attributes</a></li>
     *   <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers">
     *     Global event listeners</a></li>
     * </ol>
     * <p>
     *   The following properties are included from category 1:
     * </p>
     * <ul>
     *   <li>accessKey</li>
     *   <li>autocapitalize</li>
     *   <li>autofocus</li>
     *   <li>class</li>
     *   <li>contentEditable</li>
     *   <li>dir</li>
     *   <li>draggable</li>
     *   <li>enterKeyHint</li>
     *   <li>hidden</li>
     *   <li>id</li>
     *   <li>inputMode</li>
     *   <li>lang</li>
     *   <li>role</li>
     *   <li>slot</li>
     *   <li>spellcheck</li>
     *   <li>style</li>
     *   <li>tabIndex</li>
     *   <li>title</li>
     *   <li>translate</li>
     * </ul>
     * <p>
     *   The following ARIA-specific attributes are included from category 2:
     * </p>
     * <ul>
     *   <li>aria-activedescendant</li>
     *   <li>aria-atomic</li>
     *   <li>aria-autocomplete</li>
     *   <li>aria-busy</li>
     *   <li>aria-checked</li>
     *   <li>aria-colcount</li>
     *   <li>aria-colindex</li>
     *   <li>aria-colspan</li>
     *   <li>aria-controls</li>
     *   <li>aria-current</li>
     *   <li>aria-describedby</li>
     *   <li>aria-details</li>
     *   <li>aria-disabled</li>
     *   <li>aria-errormessage</li>
     *   <li>aria-expanded</li>
     *   <li>aria-flowto</li>
     *   <li>aria-haspopup</li>
     *   <li>aria-hidden</li>
     *   <li>aria-invalid</li>
     *   <li>aria-keyshortcuts</li>
     *   <li>aria-label</li>
     *   <li>aria-labelledby</li>
     *   <li>aria-level</li>
     *   <li>aria-live</li>
     *   <li>aria-modal</li>
     *   <li>aria-multiline</li>
     *   <li>aria-multiselectable</li>
     *   <li>aria-orientation</li>
     *   <li>aria-owns</li>
     *   <li>aria-placeholder</li>
     *   <li>aria-posinset</li>
     *   <li>aria-pressed</li>
     *   <li>aria-readonly</li>
     *   <li>aria-relevant</li>
     *   <li>aria-required</li>
     *   <li>aria-roledescription</li>
     *   <li>aria-rowcount</li>
     *   <li>aria-rowindex</li>
     *   <li>aria-rowspan</li>
     *   <li>aria-selected</li>
     *   <li>aria-setsize</li>
     *   <li>aria-sort</li>
     *   <li>aria-valuemax</li>
     *   <li>aria-valuemin</li>
     *   <li>aria-valuenow</li>
     *   <li>aria-valuetext</li>
     * </ul>
     * <p>
     *   The following event listener properties are included
     *   from category 3:
     * </p>
     * <ul>
     *   <li>onBlur</li>
     *   <li>onClick</li>
     *   <li>onContextMenu</li>
     *   <li>onDblClick</li>
     *   <li>onDrag</li>
     *   <li>onDragEnd</li>
     *   <li>onDragEnter</li>
     *   <li>onDragExit</li>
     *   <li>onDragLeave</li>
     *   <li>onDragOver</li>
     *   <li>onDragStart</li>
     *   <li>onDrop</li>
     *   <li>onFocus</li>
     *   <li>onKeyDown</li>
     *   <li>onKeyPress</li>
     *   <li>onKeyUp</li>
     *   <li>onMouseDown</li>
     *   <li>onMouseEnter</li>
     *   <li>onMouseLeave</li>
     *   <li>onMouseMove</li>
     *   <li>onMouseOut</li>
     *   <li>onMouseOver</li>
     *   <li>onMouseUp</li>
     *   <li>onPointerOver</li>
     *   <li>onPointerEnter</li>
     *   <li>onPointerDown</li>
     *   <li>onPointerMove</li>
     *   <li>onPointerUp</li>
     *   <li>onPointerCancel</li>
     *   <li>onPointerOut</li>
     *   <li>onPointerLeave</li>
     *   <li>onTouchCancel</li>
     *   <li>onTouchEnd</li>
     *   <li>onTouchMove</li>
     *   <li>onTouchStart</li>
     *   <li>onWheel</li>
     * </ul>
     * <p>
     *   The above event listener properties can also be specified with
     *   the "Capture" suffix (e.g., "onClickCapture") to indicate that the
     *   listener should be registered as a capture listener.
     * </p>
     * <p>
     *   Finally, onfocusin and onfocusout properties are also available,
     *   though technically speaking these are
     *   <a href="https://github.com/preactjs/preact/issues/1611">not global
     *   events</a>.
     * </p>
     * @typedef {Object} GlobalProps
     * @ojexports
     * @memberof ojvcomponent
     */

    /**
     * <p>
     *   The ObservedGlobalProps type is used to identify the subset of
     *   <a href="#GlobalProps">GlobalProps</a> that the VComponent implementation
     *   needs to observe.  When a VComponent is used as a custom element,
     *   ObservedGlobalProps determines which of the GlobalProps values will be
     *   extracted from the DOM and passed into the VComponent.  Properties
     *   that are selected using ObservedGlobalProps are also included in
     *   the custom element's observedAttributes list.  As a result, updates to
     *   observed global properties will trigger the VComponent to render
     *   with the new values.
     * </p>
     * <p>
     *   The ObservedGlobalProps type acts as a Pick type, where properties are
     *   implicitly picked from GlobalProps.  The resulting type is typically
     *   merged with any component-specific properties via a union.
     * </p>
     * <p>
     *   See the <a href="#observed">Observed Global Properties</a> section for
     *   more details.
     * </p>
     * @typedef {Object} ObservedGlobalProps
     * @ojexports
     * @memberof ojvcomponent
     */

    /**
     * <p>
     *   The PropertyChanged type is used to identify callback properties that
     *   notify VComponent consumers of writeback property mutations.
     *   Writeback property callbacks must adhere to the naming convention of
     *   "on<PropertyName>Changed", where "PropertyName" is the name of the
     *   writeback property with the first character converted to upper case:
     * </p>
     * <pre class="prettyprint"><code>type Props = {
     *   // This is a writeback property
     *   value?: string;
     *
     *   // This is the corresponding property changed callback
     *   onValueChanged?: PropertyChanged<string>
     * }
     * </code></pre>
     * <p>
     *   See the <a href="#writeback">Writeback Properties</a> section for
     *   more details.
     * </p>
     * @typedef {Object} PropertyChanged
     * @ojexports
     * @memberof ojvcomponent
     * @ojsignature [{target:"Type", value:"<T>", for:"genericTypeParameters"},
     *               {target: "Type", value: "(value: T) => void"}]
     */

    /**
     * <p>
     *   The Slot type identifies properties as representing named slot
     *   children.  This type is an alias for Preact's ComponentChildren type.  As
     *   such, the value of a slot property can either be embedded directly in
     *   a virtual DOM tree or can be passed to Preact's
     *   <a href="https://preactjs.com/guide/v10/api-reference/#tochildarray">
     *   toChildArray</a>.
     * </p>
     * <p>
     *   See <a href="#children">Children and Slots</a> for more details.
     * </p>
     * @typedef {Function} Slot
     * @ojexports
     * @memberof ojvcomponent
     * @ojsignature [{target: "Type", value: "ComponentChildren"}]
     */

    /**
     * <p>
     *   The TemplateSlot type identifies properties as representing named
     *   template slot children.  Unlike the <a href="#Slot">Slot</a> type,
     *   TemplateSlot is a functional type that takes some context and returns
     *   the slot children.
     * </p>
     * <p>
     *   See the <a href="#template-slots">Template Slots</a> section for more details.
     * </p>
     * @typedef {Function} TemplateSlot
     * @ojexports
     * @memberof ojvcomponent
     * @ojsignature [{target:"Type", value:"<Data extends object>", for:"genericTypeParameters"},
     *               {target: "Type", value: "(data: Data) => VComponent.Slot"}]
     */

    // STATIC METHODS


    /**
     * <p>
     *   For the most part, VComponents should not need to render ids on child
     *   content.  However, in some cases this may be necessary.  For example,
     *   in order to set up a relationship between a label and the element that
     *   the label references, the label and labeled content must rendezvous on
     *   a common id.  Specifying fixed ids is problematic as this can
     *   lead to conflicts with other ids on the page.  The getUniqueId()
     *   method helps solve this problem by creating producing an id that is
     *   guaranteed not to conflict with ids rendered by other components.
     * </p>
     * <p>
     *   The id returned by getUniqueId() is typically used to provide a prefix
     *   (or suffix) for what would otherwise be a static id for some element
     *   rendered by the VComponent.
     * </p>
     * <p>
     *   The usage model is:
     * </p>
     * <ol>
     *   <li>
     *   In the VComponent's constructor, check to see whether the
     *   VComponent already has a props.id value.  If so, this can be used as a
     *   prefix for other ids and calling getUniqueId() is unnecessary.
     *   </li>
     *   <li>
     *   Otherwise, call getUniqueId() to retrieve the unique prefix for
     *   this component
     *   </li>
     *   <li>
     *   Store the result of the #1/#2 in an instance variable for later
     *   use.
     *   </li>
     *   <li>
     *   When rendering, use the previously stored prefix to generate
     *   unique ids for any elements that need them.
     *   </li>
     *   <li>
     *   Don't forget to include "id" in the list of
     *   <a href="#ObservedGlobalProps">ObservedGlobalProps</a> in
     *   order to ensure that the VComponent receives the value of this global
     *   HTML attribute.
     *   </li>
     * </ol>
     * <p>
     *   Putting this all together, we end up with a component like this:
     * </p>
     * <pre class="prettyprint"><code>import { h, Component, ComponentChild } from 'preact';
     * import { customElement, ExtendGlobalProps, ObservedGlobalProps, getUniqueId } from 'ojs/ojvcomponent';
     * import "ojs/ojinputtext";
     * import "ojs/ojlabel";
     *
     * export type Props = ObservedGlobalProps&lt;'id'&gt;;
     *
     * &#64;customElement('oj-demo-unique-id')
     * export class DemoUniqueId extends Component&lt;ExtendGlobalProps&lt;Props&gt;&gt; {
     *
     *   private uniquePrefix: string;
     *
     *   constructor(props: Readonly&lt;Props&gt;) {
     *     super(props)
     *
     *     this.uniquePrefix = props.id ?? getUniqueId();
     *   }
     *
     *   render(): ComponentChild {
     *
     *     const inputTextId = `${this.uniquePrefix}_input`;
     *
     *     return (
     *       &lt;div&gt;
     *         &lt;oj-label for={ inputTextId }&gt;Label&lt;/oj-label&gt;
     *         &lt;oj-input-text id={ inputTextId } value="Value"/&gt;
     *       &lt;/div&gt;
     *     );
     *   }
     * }
     * </code></pre>
     *
     * @function getUniqueId
     * @return {string}
     *
     * @memberof ojvcomponent
     * @expose
     * @ojexports
     */

    /**
     * <p>
     *   Root is a Preact component that can be used to wrap the
     *   VComponent's child content.  This component should only be used
     *   for cases where the VComponent needs to control how
     *   <a href="#observed">observed global properties</a> are rendered on
     *   the component's root custom element.  In all other cases the
     *   non-wrapped child content should be returned directly.
     * </p>
     * <p>
     *   See the <a href="#root-element">Root Element</a> section for more details.
     * </p>
     *
     * @function Root
     *
     * @memberof ojvcomponent
     * @expose
     * @ojexports
     */

    class Parking {
        parkNode(node) {
            this._getLot().appendChild(node);
            if (oj.Components) {
                oj.Components.subtreeHidden(node);
            }
        }
        disposeNodes(nodeMap, cleanFunc) {
            Parking._iterateSlots(nodeMap, (node) => {
                const parent = node.parentElement;
                if (this._lot === parent) {
                    cleanFunc(node);
                    this._lot.removeChild(node);
                }
                else if (!parent) {
                    cleanFunc(node);
                }
            });
        }
        disconnectNodes(nodeMap) {
            Parking._iterateSlots(nodeMap, (node) => {
                if (this._lot === node.parentElement) {
                    this._lot.removeChild(node);
                }
            });
        }
        reconnectNodes(nodeMap) {
            Parking._iterateSlots(nodeMap, (node) => {
                if (!node.parentElement) {
                    this._lot.appendChild(node);
                }
            });
        }
        isParked(n) {
            return (n === null || n === void 0 ? void 0 : n.parentElement) === this._lot;
        }
        _getLot() {
            if (!this._lot) {
                const div = document.createElement('div');
                div.style.display = 'none';
                document.body.appendChild(div);
                this._lot = div;
            }
            return this._lot;
        }
        static _iterateSlots(nodeMap, callback) {
            const keys = Object.keys(nodeMap);
            keys.forEach((key) => {
                const nodes = nodeMap[key];
                nodes.forEach((node) => {
                    callback(node);
                });
            });
        }
    }
    const ParkingLot = new Parking();

    function convertToVNode(node, slot, index, handleSlotMount, handleSlotUnmount) {
        const key = `_${slot}_${index}_`;
        const ref = _getReplacerRef(node, handleSlotMount, handleSlotUnmount);
        return preact.h(() => preact.h('oj-slot-replacer', { ref, key }), null);
    }
    class SlotReplacerElement extends HTMLElement {
        connectedCallback() {
            const slot = this[ojpreactPatch.OJ_SLOT];
            if (slot) {
                this.parentElement.replaceChild(slot, this);
            }
            const once = this[_ON_FIRST_INSERT];
            if (once) {
                once();
                this[_ON_FIRST_INSERT] = null;
            }
        }
        get parentNode() {
            const delegate = this[ojpreactPatch.OJ_SLOT];
            return !delegate || ParkingLot.isParked(delegate) ? null : delegate.parentNode;
        }
        get nextSibling() {
            const delegate = this[ojpreactPatch.OJ_SLOT];
            if (!delegate || ParkingLot.isParked(delegate)) {
                return null;
            }
            const siblingToSlot = delegate.nextSibling;
            return (siblingToSlot === null || siblingToSlot === void 0 ? void 0 : siblingToSlot[ojpreactPatch.OJ_REPLACER]) || siblingToSlot;
        }
    }
    customElements.define('oj-slot-replacer', SlotReplacerElement);
    const _ON_FIRST_INSERT = Symbol();
    function _getReplacerRef(slotNode, handleSlotMount, handleSlotUnmount) {
        let _activeReplacer;
        let _count = 0;
        const onInitialInsert = () => {
            handleSlotMount(slotNode);
        };
        return (replacerElem) => {
            if (replacerElem != null) {
                _count++;
                if (_activeReplacer) {
                    _activeReplacer[ojpreactPatch.OJ_SLOT] = null;
                }
                _activeReplacer = slotNode[ojpreactPatch.OJ_REPLACER] = replacerElem;
                const parent = replacerElem.parentElement;
                ojpreactPatch.patchSlotParent(parent);
                replacerElem[ojpreactPatch.OJ_SLOT] = slotNode;
                if (replacerElem.isConnected) {
                    parent.replaceChild(slotNode, replacerElem);
                    onInitialInsert();
                }
                else {
                    replacerElem[_ON_FIRST_INSERT] = onInitialInsert;
                }
            }
            else {
                _count--;
                if (_count < 0) {
                    throw new ojcustomelementUtils.JetElementError(this, 'Slot replacer count underflow');
                }
                if (_count === 0) {
                    slotNode.remove();
                    handleSlotUnmount(slotNode);
                }
            }
        };
    }

    const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function diffProps(dom, newProps, oldProps, isSvg, hydrate, setPropertyOverrides) {
        let i;
        for (i in oldProps) {
            if (i !== 'children' && i !== 'key' && !(i in newProps)) {
                setPropertyOverrides(dom, i, null, oldProps[i], isSvg) ||
                    setProperty(dom, i, null, oldProps[i], isSvg);
            }
        }
        for (i in newProps) {
            if ((!hydrate || typeof newProps[i] == 'function') &&
                i !== 'children' &&
                i !== 'key' &&
                i !== 'value' &&
                i !== 'checked' &&
                oldProps[i] !== newProps[i]) {
                setPropertyOverrides(dom, i, newProps[i], oldProps[i], isSvg) ||
                    setProperty(dom, i, newProps[i], oldProps[i], isSvg);
            }
        }
    }
    function setStyle(style, key, value) {
        if (key[0] === '-') {
            style.setProperty(key, value);
        }
        else if (value == null) {
            style[key] = '';
        }
        else if (typeof value != 'number' || IS_NON_DIMENSIONAL.test(key)) {
            style[key] = value;
        }
        else {
            style[key] = value + 'px';
        }
    }
    function setProperty(dom, name, value, oldValue, isSvg) {
        let useCapture;
        o: if (name === 'style') {
            if (typeof value == 'string') {
                dom.style.cssText = value;
            }
            else {
                if (typeof oldValue == 'string') {
                    dom.style.cssText = oldValue = '';
                }
                if (oldValue) {
                    for (name in oldValue) {
                        if (!(value && name in value)) {
                            setStyle(dom.style, name, '');
                        }
                    }
                }
                if (value) {
                    for (name in value) {
                        if (!oldValue || value[name] !== oldValue[name]) {
                            setStyle(dom.style, name, value[name]);
                        }
                    }
                }
            }
        }
        else if (name[0] === 'o' && name[1] === 'n') {
            useCapture = name !== (name = name.replace(/Capture$/, ''));
            if (name.toLowerCase() in dom)
                name = name.toLowerCase().slice(2);
            else
                name = name.slice(2);
            if (!dom._listeners)
                dom._listeners = {};
            dom._listeners[name + useCapture] = value;
            if (value) {
                if (!oldValue) {
                    const handler = useCapture ? eventProxyCapture : eventProxy;
                    dom.addEventListener(name, handler, useCapture);
                }
            }
            else {
                const handler = useCapture ? eventProxyCapture : eventProxy;
                dom.removeEventListener(name, handler, useCapture);
            }
        }
        else if (name !== 'dangerouslySetInnerHTML') {
            if (isSvg) {
                name = name.replace(/xlink[H:h]/, 'h').replace(/sName$/, 's');
            }
            else if (name !== 'href' &&
                name !== 'list' &&
                name !== 'form' &&
                name !== 'tabIndex' &&
                name !== 'download' &&
                name in dom) {
                try {
                    dom[name] = value == null ? '' : value;
                    break o;
                }
                catch (e) { }
            }
            if (typeof value === 'function') {
            }
            else if (value != null && (value !== false || (name[0] === 'a' && name[1] === 'r'))) {
                dom.setAttribute(name, value);
            }
            else {
                dom.removeAttribute(name);
            }
        }
    }
    function eventProxy(e) {
        this._listeners[e.type + false](preact.options.event ? preact.options.event(e) : e);
    }
    function eventProxyCapture(e) {
        this._listeners[e.type + true](preact.options.event ? preact.options.event(e) : e);
    }

    const ELEMENT_REF = Symbol();
    const ROOT_VNODE_PATCH = Symbol();
    const _EMPTY_SET = new Set();
    const _LISTENERS = Symbol();
    const _CAPTURE_LISTENERS = Symbol();
    const _SUBPROP = 'subproperty';
    const _PROP_CHANGE = 'propChange';
    const _ACTION = 'action';
    class IntrinsicElement {
        constructor(element, component, metadata, rootAttributes, rootProperties, defaultProps) {
            this.ref = preact.createRef();
            this._isPatching = false;
            this._props = { ref: this.ref };
            this._verifyingState = ConnectionState.Unset;
            this._earlySets = [];
            this._eventQueue = [];
            this._isRenderQueued = false;
            this._state = ojcustomelementUtils.CustomElementUtils.getElementState(element);
            this._element = element;
            this._metadata = metadata;
            this._component = component;
            this._controlledProps = (rootProperties === null || rootProperties === void 0 ? void 0 : rootProperties.length) > 0 ? new Set(rootProperties) : _EMPTY_SET;
            this._controlledAttrs = (rootAttributes === null || rootAttributes === void 0 ? void 0 : rootAttributes.length) > 0 ? new Set(rootAttributes) : _EMPTY_SET;
            this._defaultProps = defaultProps;
            this._rootPatchCallback = this._patchRootElement.bind(this);
        }
        connectedCallback() {
            this._verifyConnectDisconnect(ConnectionState.Connect);
        }
        disconnectedCallback() {
            this._verifyConnectDisconnect(ConnectionState.Disconnect);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (!this._isPatching && this._state.canHandleAttributes()) {
                const propName = ojcustomelementUtils.AttributeUtils.attributeToPropertyName(name);
                const topProp = propName.split('.')[0];
                if (this._state.dirtyProps.has(topProp)) {
                    this._state.dirtyProps.delete(topProp);
                }
                else if (oldValue === newValue) {
                    return;
                }
                if (newValue === null) {
                    newValue = undefined;
                }
                if ('knockout' === this._state.getBindingProviderType()) {
                    if (!ojcustomelementUtils.AttributeUtils.isGlobalOrData(propName)) {
                        this._element.dispatchEvent(new CustomEvent('attribute-changed', {
                            detail: { attribute: name, value: newValue, previousValue: oldValue }
                        }));
                    }
                }
                const [prop, value, propMeta] = this._getPropValuePair(name, newValue);
                if (prop) {
                    this._updatePropsAndQueueRenderAsNeeded(prop, value, propMeta);
                }
            }
        }
        getProperty(name) {
            var _a;
            const meta = MetadataUtils.getPropertyMetadata(name, (_a = this._metadata) === null || _a === void 0 ? void 0 : _a.properties);
            if (!meta) {
                return this._element[name];
            }
            else {
                let value = ojcustomelementUtils.CustomElementUtils.getPropertyValue(this._props, name);
                if (value === undefined && this._defaultProps) {
                    value = ojcustomelementUtils.CustomElementUtils.getPropertyValue(this._defaultProps, name);
                }
                return value;
            }
        }
        setProperty(name, value) {
            var _a;
            if (this._isPatching)
                return;
            const meta = MetadataUtils.getPropertyMetadata(name, (_a = this._metadata) === null || _a === void 0 ? void 0 : _a.properties);
            if (!meta) {
                this._element[name] = value;
            }
            else {
                if (this._state.allowPropertySets()) {
                    value = ojcustomelementUtils.CustomElementUtils.convertEmptyStringToUndefined(this._element, meta, value);
                    this._updatePropsAndQueueRenderAsNeeded(name, value, meta);
                }
                else {
                    this._earlySets.push({ property: name, value });
                }
            }
        }
        setProperties(properties) {
            if (this._isPatching) {
                return;
            }
            Object.keys(properties).forEach((prop) => {
                this.setProperty(prop, properties[prop]);
            });
        }
        getProps() {
            return this._props;
        }
        isInitialized() {
            return !!this._vdom;
        }
        appendChildHelper(element, newNode) {
            if (ojcustomelementUtils.CustomElementUtils.canRelocateNode(element, newNode)) {
                return HTMLElement.prototype.appendChild.call(element, newNode);
            }
            return newNode;
        }
        insertBeforeHelper(element, newNode, refNode) {
            if (ojcustomelementUtils.CustomElementUtils.canRelocateNode(element, newNode)) {
                return HTMLElement.prototype.insertBefore.call(element, newNode, refNode);
            }
            return newNode;
        }
        _render() {
            var _a;
            if (!this._vdom) {
                this._initializePropsFromDom();
                const eventsMeta = this._metadata.events;
                if (eventsMeta) {
                    this._initializeActionCallbacks(eventsMeta);
                }
                const writebackProps = (_a = this._metadata.extension) === null || _a === void 0 ? void 0 : _a['_WRITEBACK_PROPS'];
                if (writebackProps) {
                    this._initializeWritebackCallbacks(writebackProps);
                }
                this._playbackEarlyPropertySets();
            }
            this._vdom = preact.h(this._component, this._props, null);
            this._vdom.props[ELEMENT_REF] = this._element;
            this._vdom.props[ROOT_VNODE_PATCH] = this._rootPatchCallback;
            this._isPatching = true;
            preact.render(this._vdom, this._element);
            this._isPatching = false;
        }
        _getPropValuePair(attrName, attrValue) {
            var _a, _b;
            if ('knockout' !== this._state.getBindingProviderType() ||
                !ojcustomelementUtils.AttributeUtils.getExpressionInfo(attrValue).expr) {
                const propName = ojcustomelementUtils.AttributeUtils.attributeToPropertyName(attrName);
                const propMeta = MetadataUtils.getPropertyMetadata(propName, (_a = this._metadata) === null || _a === void 0 ? void 0 : _a.properties);
                if (propMeta) {
                    if (propMeta.readOnly) {
                        return [null, null, null];
                    }
                    return [
                        propName,
                        ojcustomelementUtils.AttributeUtils.attributeToPropertyValue(this._element, attrName, attrValue, propMeta),
                        propMeta
                    ];
                }
                const globalPropName = ojcustomelementUtils.AttributeUtils.getGlobalPropForAttr(attrName);
                if (this._controlledProps.has(globalPropName)) {
                    return [globalPropName, (_b = this[globalPropName]) !== null && _b !== void 0 ? _b : attrValue, null];
                }
            }
            return [null, null, null];
        }
        _updatePropsAndQueueRenderAsNeeded(prop, value, propMeta, isOuter = true) {
            const previousValue = this.getProperty(prop);
            if (propMeta && ojcustomelementUtils.ElementUtils.comparePropertyValues(propMeta, value, previousValue)) {
                return;
            }
            const propPath = prop.split('.');
            const topProp = propPath[0];
            const isSubprop = propPath.length > 1;
            let topPropPrevValue = this.getProperty(topProp);
            if (oj.CollectionUtils.isPlainObject(topPropPrevValue)) {
                topPropPrevValue = oj.CollectionUtils.copyInto({}, topPropPrevValue, undefined, true);
            }
            if (isOuter) {
                this._verifyProps(prop, value, propMeta);
            }
            this._updateProps(propPath, value);
            if (!isOuter ||
                (this._state.allowPropertyChangedEvents() && !ojcustomelementUtils.AttributeUtils.isGlobalOrData(prop))) {
                this._state.dirtyProps.add(topProp);
                const updatedFrom = isOuter ? 'external' : 'internal';
                const detail = {
                    value: this.getProperty(topProp),
                    previousValue: topPropPrevValue,
                    updatedFrom
                };
                if (isSubprop) {
                    detail[_SUBPROP] = {
                        path: prop,
                        value,
                        previousValue
                    };
                }
                const type = topProp + 'Changed';
                const collapseFunc = isSubprop
                    ? null
                    : (oldDef) => {
                        if (oldDef.kind !== _PROP_CHANGE || oldDef.type !== type || oldDef.detail[_SUBPROP]) {
                            return null;
                        }
                        const mergedDetail = Object.assign({}, detail, {
                            previousValue: oldDef.detail.previousValue
                        });
                        return { type, detail: mergedDetail, collapse: collapseFunc, kind: _PROP_CHANGE };
                    };
                this._queueFireEventsTask({ type, detail, collapse: collapseFunc, kind: _PROP_CHANGE });
            }
            const oldProps = this._oldRootProps;
            if (oldProps && this._controlledProps.has(prop)) {
                oldProps[prop] = value;
            }
            this._queueRender(this._vdom && !(propMeta === null || propMeta === void 0 ? void 0 : propMeta.readOnly));
        }
        _queueRender(needRendering) {
            if (needRendering && !this._isRenderQueued) {
                this._isRenderQueued = true;
                window.queueMicrotask(() => {
                    this._isRenderQueued = false;
                    this._render();
                });
            }
        }
        _verifyProps(prop, value, propMeta) {
            if (!propMeta) {
                return;
            }
            if (propMeta.readOnly) {
                throw new ojcustomelementUtils.JetElementError(this._element, `Read-only property '${prop}' cannot be set.`);
            }
            try {
                MetadataUtils.checkEnumValues(this._element, prop, value, propMeta);
            }
            catch (error) {
                throw new ojcustomelementUtils.JetElementError(this._element, error.message);
            }
        }
        _updateProps(propPath, value) {
            var _a, _b;
            const topProp = propPath[0];
            let propsObj = this._props;
            if (propPath.length > 1) {
                const currentValue = (_a = this._props[topProp]) !== null && _a !== void 0 ? _a : (_b = this._defaultProps) === null || _b === void 0 ? void 0 : _b[topProp];
                if (currentValue && oj.CollectionUtils.isPlainObject(currentValue)) {
                    propsObj[topProp] = oj.CollectionUtils.copyInto({}, currentValue, undefined, true);
                }
                else {
                    propsObj[topProp] = {};
                }
            }
            while (propPath.length) {
                const subprop = propPath.shift();
                if (propPath.length === 0) {
                    propsObj[subprop] = value;
                }
                else if (!propsObj[subprop]) {
                    propsObj[subprop] = {};
                }
                propsObj = propsObj[subprop];
            }
        }
        _queueFireEventsTask(eventDef) {
            let newDef = eventDef;
            const collapseInfo = this._getEventCollapseInfo(eventDef, this._eventQueue);
            if (collapseInfo) {
                const [removeIndex, def] = collapseInfo;
                this._eventQueue.splice(removeIndex, 1);
                newDef = def;
            }
            this._eventQueue.push(newDef);
            if (!this._queuedEvents) {
                this._queuedEvents = new Promise((resolve) => {
                    window.queueMicrotask(() => {
                        try {
                            while (this._eventQueue.length) {
                                const def = this._eventQueue.shift();
                                const evt = def.kind === _PROP_CHANGE
                                    ? new CustomEvent(def.type, { detail: def.detail })
                                    : def.event;
                                this._element.dispatchEvent(evt);
                            }
                        }
                        finally {
                            resolve();
                            this._queuedEvents = null;
                        }
                    });
                });
            }
            return this._queuedEvents;
        }
        _getEventCollapseInfo(newDef, queue) {
            var _a;
            if (newDef.kind !== _PROP_CHANGE) {
                return null;
            }
            for (let i = 0; i < queue.length; i++) {
                const combined = (_a = newDef.collapse) === null || _a === void 0 ? void 0 : _a.call(newDef, queue[i]);
                if (combined) {
                    return [i, combined];
                }
            }
            return null;
        }
        _verifyConnectDisconnect(state) {
            if (this._verifyingState === ConnectionState.Unset) {
                window.queueMicrotask(() => {
                    if (this._verifyingState === state) {
                        if (this._verifyingState === ConnectionState.Connect) {
                            this._verifiedConnect();
                        }
                        else {
                            this._verifiedDisconnect();
                        }
                    }
                    this._verifyingState = ConnectionState.Unset;
                });
            }
            this._verifyingState = state;
        }
        _verifiedConnect() {
            if (this._state.isComplete()) {
                this._reconnectSlots();
            }
            else {
                this._state.startCreationCycle();
                if (this._state.isCreating()) {
                    const createComponentCallback = () => {
                        this._element[ojcustomelementUtils.CHILD_BINDING_PROVIDER] = 'preact';
                        let slotMap = this._state.getSlotMap();
                        if (!slotMap) {
                            slotMap = this._state.getSlotMap(true);
                            const slotProps = this._removeAndConvertSlotsToProps(slotMap);
                            Object.assign(this._props, slotProps);
                        }
                        else {
                            this._reconnectSlots();
                        }
                        this._render();
                    };
                    this._state.setCreateCallback(createComponentCallback);
                    this._state.setBindingsDisposedCallback(() => this._handleBindingsDisposed());
                }
            }
        }
        _verifiedDisconnect() {
            if (this._state.isComplete()) {
                this._disconnectSlots();
                this._state.resetCreationCycle();
                preact.render(null, this._element);
                this._applyRef(this._oldRootRef, null);
                this._oldRootRef = undefined;
                this._vdom = null;
            }
            else {
                this._state.pauseCreationCycle();
            }
        }
        _initializePropsFromDom() {
            const attrs = this._element.attributes;
            for (let i = 0; i < attrs.length; i++) {
                const { name, value } = attrs[i];
                const [prop, propVal, propMeta] = this._getPropValuePair(name, value);
                if (prop) {
                    this._verifyProps(prop, propVal, propMeta);
                    this._updateProps(prop.split('.'), propVal);
                }
            }
        }
        _playbackEarlyPropertySets() {
            var _a;
            while (this._earlySets.length) {
                const setObj = this._earlySets.shift();
                const meta = MetadataUtils.getPropertyMetadata(setObj.property, (_a = this._metadata) === null || _a === void 0 ? void 0 : _a.properties);
                const updatedValue = ojcustomelementUtils.CustomElementUtils.convertEmptyStringToUndefined(this._element, meta, setObj.value);
                this.setProperty(setObj.property, updatedValue);
            }
        }
        _patchRootElement(newVNode) {
            var _a;
            const oldProps = this._oldRootProps || this._getInitialRootProps();
            const newProps = newVNode.props;
            diffProps(this._element, newProps, oldProps, false, false, IntrinsicElement._setPropertyOverrides);
            const newRef = newVNode.ref;
            if (this._oldRootRef !== newRef) {
                this._applyRef(newRef, this._element);
                if (newRef) {
                    (_a = this._oldRootRef) === null || _a === void 0 ? void 0 : _a.call(this, null);
                }
            }
            this._oldRootProps = newProps;
            this._oldRootRef = newRef;
        }
        _applyRef(ref, value) {
            if (ref) {
                if (typeof ref == 'function') {
                    ref(value);
                }
                else {
                    ref.current = value;
                }
            }
        }
        static _setPropertyOverrides(dom, name, value, oldValue) {
            if (name === 'style' && typeof value == 'string') {
                throw new Error('CSS style must be an object. CSS text is not supported');
            }
            if (name === 'class' || name === 'className') {
                const oldClasses = oldValue == null ? _EMPTY_SET : ojcustomelementUtils.CustomElementUtils.getClassSet(oldValue);
                const newClasses = value == null ? _EMPTY_SET : ojcustomelementUtils.CustomElementUtils.getClassSet(value);
                for (const cl of oldClasses.values()) {
                    if (!newClasses.has(cl)) {
                        dom.classList.remove(cl);
                    }
                }
                for (const cl of newClasses.values()) {
                    if (!oldClasses.has(cl)) {
                        dom.classList.add(cl);
                    }
                }
                return true;
            }
            else if (name[0] === 'o' && name[1] === 'n') {
                const useCapture = name !== (name = name.replace(/Capture$/, ''));
                const nameLower = name.toLowerCase();
                if (nameLower in dom)
                    name = nameLower;
                name = name.slice(2);
                IntrinsicElement._getRootListeners(dom, useCapture)[name] = value;
                const proxy = useCapture ? IntrinsicElement._eventProxyCapture : IntrinsicElement._eventProxy;
                if (value) {
                    if (!oldValue)
                        dom.addEventListener(name, proxy, useCapture);
                }
                else {
                    dom.removeEventListener(name, proxy, useCapture);
                }
                return true;
            }
            return false;
        }
        static _getRootListeners(dom, useCapture) {
            const key = useCapture ? _CAPTURE_LISTENERS : _LISTENERS;
            let listeners = dom[key];
            if (!listeners) {
                listeners = dom[key] = {};
            }
            return listeners;
        }
        _getInitialRootProps() {
            const props = {};
            for (const name of this._controlledProps.values()) {
                if (name in this._props) {
                    props[name] = this._props[name];
                }
            }
            return props;
        }
        _removeAndConvertSlotsToProps(slotMap) {
            var _a, _b;
            const dynamicSlotMetadata = (_a = this._metadata.extension) === null || _a === void 0 ? void 0 : _a._DYNAMIC_SLOT;
            const dynamicSlotProp = dynamicSlotMetadata === null || dynamicSlotMetadata === void 0 ? void 0 : dynamicSlotMetadata.prop;
            const slotsMetadata = (_b = this._metadata) === null || _b === void 0 ? void 0 : _b.slots;
            const slots = Object.keys(slotMap);
            const slotProps = {};
            if (slots.length > 0) {
                slots.forEach((slot) => {
                    const slotNodes = slotMap[slot];
                    slotNodes.forEach((node) => {
                        ParkingLot.parkNode(node);
                    });
                    const slotMetadata = MetadataUtils.getPropertyMetadata(slot, slotsMetadata);
                    if (slotMetadata) {
                        const isTemplateSlot = !!(slotMetadata === null || slotMetadata === void 0 ? void 0 : slotMetadata.data);
                        const slotProperty = !isTemplateSlot && slot === '' ? 'children' : slot;
                        this._assignSlotProperty(slotProps, slotProperty, undefined, slot, isTemplateSlot, slotNodes);
                    }
                    else {
                        if (!dynamicSlotProp) {
                            return;
                        }
                        if (!slotProps[dynamicSlotProp]) {
                            slotProps[dynamicSlotProp] = {};
                        }
                        const isTemplateSlot = dynamicSlotMetadata.isTemplate;
                        this._assignSlotProperty(slotProps, slot, dynamicSlotProp, slot, isTemplateSlot, slotNodes);
                    }
                });
            }
            if (this._state.getBindingProviderType() === 'knockout') {
                let child;
                while ((child = this._element.firstChild)) {
                    this._state.getBindingProviderCleanNode()(child);
                    child.remove();
                }
            }
            return slotProps;
        }
        _assignSlotProperty(slotProps, propName, containerPropName, slotName, isTemplateSlot, slotNodes) {
            var _a, _b;
            const propContainer = containerPropName ? slotProps[containerPropName] : slotProps;
            if (isTemplateSlot) {
                if (((_a = slotNodes[0]) === null || _a === void 0 ? void 0 : _a.nodeName) === 'TEMPLATE') {
                    const templateNode = slotNodes[0];
                    propContainer[propName] =
                        (_b = templateNode['render']) !== null && _b !== void 0 ? _b : this._getSlotRenderer(templateNode, propName, containerPropName);
                }
                else {
                    throw new ojcustomelementUtils.JetElementError(this._element, `Slot content for template slot ${slotName} must be a template element.`);
                }
            }
            else {
                const vnodes = slotNodes.map((node, index) => convertToVNode(node, slotName, index, IntrinsicElement._handleSlotMount, this._handleSlotUnmount.bind(this)));
                propContainer[propName] = vnodes;
            }
        }
        _getSlotRenderer(templateNode, slotProp, containerProp) {
            const bindingProvider = this._state.getBindingProvider();
            const mutationCallback = bindingProvider
                ? () => {
                    const propContainer = containerProp ? this._props[containerProp] : this._props;
                    propContainer[slotProp] = this._getSlotRenderer(templateNode, slotProp, containerProp);
                    this._queueRender(true);
                }
                : null;
            return (context) => {
                const cachedTemplateEngine = this._state.getTemplateEngine();
                if (!cachedTemplateEngine) {
                    throw new ojcustomelementUtils.JetElementError(this._element, 'Unexpected call to render a template slot');
                }
                return cachedTemplateEngine.execute(this._element, templateNode, context, bindingProvider, mutationCallback);
            };
        }
        _handleBindingsDisposed() {
            ParkingLot.disposeNodes(this._state.getSlotMap(), this._state.getBindingProviderCleanNode());
            this._state.disposeTemplateCache();
        }
        _disconnectSlots() {
            ParkingLot.disconnectNodes(this._state.getSlotMap());
        }
        _reconnectSlots() {
            ParkingLot.reconnectNodes(this._state.getSlotMap());
        }
        _handleSlotUnmount(node) {
            if (this._state.isComplete()) {
                ParkingLot.parkNode(node);
            }
        }
        static _handleSlotMount(node) {
            if (oj.Components) {
                oj.Components.subtreeShown(node);
            }
        }
        static _eventProxy(e) {
            this[_LISTENERS][e.type](preact.options.event ? preact.options.event(e) : e);
        }
        static _eventProxyCapture(e) {
            this[_CAPTURE_LISTENERS][e.type](preact.options.event ? preact.options.event(e) : e);
        }
        _initializeActionCallbacks(eventsMeta) {
            Object.keys(eventsMeta).forEach((event) => {
                const eventMeta = eventsMeta[event];
                const eventProp = ojcustomelementUtils.AttributeUtils.eventTypeToEventListenerProperty(event);
                this._props[eventProp] = (detailObj) => {
                    const detail = Object.assign({}, detailObj);
                    const cancelable = !!eventMeta.cancelable;
                    const acceptPromises = [];
                    if (cancelable) {
                        detail.accept = (promise) => {
                            acceptPromises.push(promise);
                        };
                    }
                    const eventDescriptor = { detail, bubbles: !!eventMeta.bubbles, cancelable };
                    const customEvent = new CustomEvent(event, eventDescriptor);
                    const eventPromise = this._queueFireEventsTask({ event: customEvent, kind: _ACTION });
                    if (cancelable) {
                        return eventPromise.then(() => {
                            return customEvent.defaultPrevented
                                ? Promise.reject()
                                : Promise.all(acceptPromises).then(() => Promise.resolve(), (reason) => Promise.reject(reason));
                        });
                    }
                    return undefined;
                };
            });
        }
        _initializeWritebackCallbacks(writebackProps) {
            writebackProps.forEach((prop) => {
                var _a;
                const callbackProp = ojcustomelementUtils.AttributeUtils.propertyNameToChangedCallback(prop);
                const meta = MetadataUtils.getPropertyMetadata(prop, (_a = this._metadata) === null || _a === void 0 ? void 0 : _a.properties);
                this._props[callbackProp] = (value) => {
                    this._updatePropsAndQueueRenderAsNeeded(prop, value, meta, false);
                };
            });
        }
    }
    var ConnectionState;
    (function (ConnectionState) {
        ConnectionState[ConnectionState["Connect"] = 0] = "Connect";
        ConnectionState[ConnectionState["Disconnect"] = 1] = "Disconnect";
        ConnectionState[ConnectionState["Unset"] = 2] = "Unset";
    })(ConnectionState || (ConnectionState = {}));

    class ValueBasedElement {
        constructor() {
            this.appendChildHelper = (element, newNode) => HTMLElement.prototype.appendChild.call(element, newNode);
            this.insertBeforeHelper = (element, newNode, refNode) => HTMLElement.prototype.insertBefore.call(element, newNode, refNode);
        }
        connectedCallback() { }
        disconnectedCallback() { }
        attributeChangedCallback(name, oldValue, newValue) { }
        getProperty(name) {
            return undefined;
        }
        setProperty(name, value) { }
        setProperties(properties) { }
    }
    const valueBasedElement = new ValueBasedElement();

    const dispatchEventWrapper = ojtraceEvent.traceDispatchEvent(HTMLElement.prototype.dispatchEvent);
    class HTMLJetElement extends HTMLElement {
        constructor() {
            super(...arguments);
            this.dispatchEvent = dispatchEventWrapper;
        }
        static get observedAttributes() {
            let observed = [];
            if (this.metadata.properties) {
                observed = observed.concat(MetadataUtils.getFlattenedAttributes(this.metadata.properties));
            }
            if (this.rootObservedAttributes) {
                observed = observed.concat(this.rootObservedAttributes);
            }
            return observed;
        }
        connectedCallback() {
            this._getHelper().connectedCallback();
        }
        disconnectedCallback() {
            var _a;
            (_a = this._helper) === null || _a === void 0 ? void 0 : _a.disconnectedCallback();
        }
        attributeChangedCallback(name, oldValue, newValue) {
            var _a;
            (_a = this._helper) === null || _a === void 0 ? void 0 : _a.attributeChangedCallback(name, oldValue, newValue);
        }
        getProperty(name) {
            return this._getHelper().getProperty(name);
        }
        setProperty(name, value) {
            this._getHelper().setProperty(name, value);
        }
        setProperties(properties) {
            this._getHelper().setProperties(properties);
        }
        appendChild(newNode) {
            return this._getHelper().appendChildHelper(this, newNode);
        }
        insertBefore(newNode, refNode) {
            return this._getHelper().insertBeforeHelper(this, newNode, refNode);
        }
        setAttribute(qualifiedName, value) {
            if (qualifiedName === 'class') {
                const outerClasses = ojcustomelementUtils.CustomElementUtils.getClassSet(value);
                ojcustomelementUtils.CustomElementUtils.getElementState(this).setOuterClasses(outerClasses);
            }
            else {
                HTMLElement.prototype.setAttribute.call(this, qualifiedName, value);
            }
        }
        removeAttribute(qualifiedName) {
            if (qualifiedName === 'class') {
                this.setAttribute('class', '');
            }
            else {
                HTMLElement.prototype.removeAttribute.call(this, qualifiedName);
            }
        }
        _getHelper() {
            if (!this._helper) {
                if (this.hasAttribute('data-oj-jsx')) {
                    this.removeAttribute('data-oj-jsx');
                    this.classList.add('oj-complete');
                    this._helper = valueBasedElement;
                }
                else {
                    this._helper = new IntrinsicElement(this, this.constructor['component'], this.constructor['metadata'], this.constructor['rootObservedAttributes'], this.constructor['rootObservedProperties'], this.constructor['defaultProps']);
                }
            }
            return this._helper;
        }
    }
    const getDescriptiveTransferAttributeValue = (element, attrName) => {
        var _a;
        const elementVal = element.getAttribute(attrName);
        if (elementVal) {
            return elementVal;
        }
        const helper = element._getHelper();
        const vprops = ((_a = helper.getProps) === null || _a === void 0 ? void 0 : _a.call(helper)) || {};
        return vprops[attrName];
    };
    const isInitialized = (element) => {
        var _a;
        const helper = element._getHelper();
        return !!((_a = helper.isInitialized) === null || _a === void 0 ? void 0 : _a.call(helper));
    };

    class VComponentState extends ojcustomelementUtils.ElementState {
        getTemplateEngine() {
            return VComponentState._cachedTemplateEngine;
        }
        getTrackChildrenOption() {
            return 'immediate';
        }
        allowPropertyChangedEvents() {
            return super.allowPropertyChangedEvents() && isInitialized(this.Element);
        }
        disposeTemplateCache() {
            var _a;
            const slotMap = this.getSlotMap();
            const slots = Object.keys(slotMap);
            const metadata = ojcustomelementUtils.CustomElementUtils.getElementDescriptor(this.Element.tagName).metadata;
            const dynamicSlotMetadata = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.extension) === null || _a === void 0 ? void 0 : _a._DYNAMIC_SLOT;
            const hasDynamicTemplateSlots = !!(dynamicSlotMetadata === null || dynamicSlotMetadata === void 0 ? void 0 : dynamicSlotMetadata.isTemplate);
            const templateSlots = slots.filter((slot) => {
                const slotMetadata = MetadataUtils.getPropertyMetadata(slot, metadata === null || metadata === void 0 ? void 0 : metadata.slots);
                if (slotMetadata) {
                    if (slotMetadata.data) {
                        return true;
                    }
                }
                else {
                    if (hasDynamicTemplateSlots) {
                        return true;
                    }
                }
                return false;
            });
            templateSlots.forEach((slot) => {
                var _a;
                const slotNodes = slotMap[slot];
                if (((_a = slotNodes[0]) === null || _a === void 0 ? void 0 : _a.nodeName) === 'TEMPLATE') {
                    this.getTemplateEngine().cleanupTemplateCache(slotNodes[0]);
                }
            });
        }
        GetPreCreatedPromise() {
            const preCreatePromise = super.GetPreCreatedPromise();
            if (!VComponentState._cachedTemplateEngine && this._hasDirectTemplateChildren()) {
                return preCreatePromise.then(() => this._getTemplateEnginePromise());
            }
            return preCreatePromise;
        }
        IsTransferAttribute(attrName) {
            return this.Element.constructor.rootObservedAttrSet.has(attrName);
        }
        GetDescriptiveTransferAttributeValue(attrName) {
            return getDescriptiveTransferAttributeValue(this.Element, attrName);
        }
        _getTemplateEnginePromise() {
            return new Promise(function (resolve, reject) { require(['ojs/ojvcomponent-template'], function (m) { resolve(_interopNamespace(m)); }, reject) }).then((eng) => {
                VComponentState._cachedTemplateEngine = eng;
            });
        }
        _hasDirectTemplateChildren() {
            const childNodeList = this.Element.childNodes;
            for (let i = 0; i < childNodeList.length; i++) {
                const child = childNodeList[i];
                if (child.localName === 'template') {
                    return true;
                }
            }
            return false;
        }
    }

    const Root = () => {
        throw new Error('The Root component should only be used as the top-level return from a VComponent render function.  It will be rewritten by VComponent code so Preact will never actually render it unless it appears in an invalid location.');
    };

    const _CLASSNAME = 'className';
    const _CLASS = 'class';
    function customElement(tagName) {
        return function (constructor) {
            var _a;
            const metadata = constructor['metadata'];
            const observedProps = ((_a = metadata === null || metadata === void 0 ? void 0 : metadata.extension) === null || _a === void 0 ? void 0 : _a['_OBSERVED_GLOBAL_PROPS']) || [];
            const observedAttrs = observedProps.map((prop) => ojcustomelementUtils.AttributeUtils.getGlobalAttrForProp(prop));
            overrideRender(tagName, constructor, metadata, new Set(observedProps));
            registerElement(tagName, metadata, constructor, observedProps, observedAttrs);
        };
    }
    function registerElement(tagName, metadata, constructor, observedProps, observedAttrs) {
        class HTMLPreactElement extends HTMLJetElement {
        }
        HTMLPreactElement.metadata = metadata || {};
        HTMLPreactElement.component = constructor;
        HTMLPreactElement.rootObservedAttributes = observedAttrs;
        HTMLPreactElement.rootObservedAttrSet = new Set(observedAttrs);
        HTMLPreactElement.rootObservedProperties = observedProps;
        HTMLPreactElement.defaultProps = constructor['defaultProps']
            ? MetadataUtils.deepFreeze(constructor['defaultProps'])
            : null;
        addPropGetterSetters(HTMLPreactElement.prototype, metadata === null || metadata === void 0 ? void 0 : metadata.properties);
        addMethods(HTMLPreactElement.prototype, metadata === null || metadata === void 0 ? void 0 : metadata.methods);
        ojcustomelementUtils.CustomElementUtils.registerElement(tagName, {
            descriptor: { metadata },
            stateClass: VComponentState,
            vcomp: true
        }, HTMLPreactElement);
    }
    function overrideRender(tagName, constructor, metadata, observedPropsSet) {
        const componentRender = constructor.prototype.render;
        constructor.prototype.render = function (props, state, context) {
            var _a;
            const readOnlyProps = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.extension) === null || _a === void 0 ? void 0 : _a['_READ_ONLY_PROPS'];
            if (readOnlyProps) {
                readOnlyProps.forEach((prop) => delete props[prop]);
            }
            const element = props[ELEMENT_REF];
            const isElementFirst = !!element;
            if (isElementFirst) {
                ojcustomelementUtils.CustomElementUtils.getElementState(element).disposeTemplateCache();
            }
            let vdom = componentRender.call(this, props, state, context);
            if (vdom.type === Root) {
                vdom = preact.cloneElement(vdom);
                vdom.type = tagName;
            }
            if (vdom.type !== tagName) {
                const rootProps = {};
                if (!isElementFirst) {
                    rootProps['ref'] = function (ref) {
                        if (ref) {
                            ref[ojcustomelementUtils.CustomElementUtils.VCOMP_INSTANCE] = {
                                props
                            };
                        }
                    };
                    rootProps['data-oj-jsx'] = '';
                    Object.keys(props).forEach((prop) => {
                        if (isGlobalProperty(prop, metadata)) {
                            rootProps[prop] = props[prop];
                        }
                    });
                    return preact.h(tagName, rootProps, vdom);
                }
                return vdom;
            }
            if (!isElementFirst) {
                const vdomProps = vdom.props;
                if (props.style && vdomProps['style']) {
                    vdomProps['style'] = Object.assign({}, props.style, vdomProps['style']);
                }
                const componentClass = props[_CLASSNAME] || props[_CLASS];
                if (componentClass) {
                    const targetProp = _CLASSNAME in vdomProps ? _CLASSNAME : _CLASS;
                    const nodeClass = vdomProps[targetProp] || '';
                    vdomProps[targetProp] = `${componentClass} ${nodeClass}`;
                }
                vdomProps['data-oj-jsx'] = '';
                Object.keys(props).forEach((prop) => {
                    if (!(prop in vdomProps) &&
                        !observedPropsSet.has(prop) &&
                        isGlobalProperty(prop, metadata)) {
                        vdomProps[prop] = props[prop];
                    }
                });
                return vdom;
            }
            props[ROOT_VNODE_PATCH](vdom);
            return preact.h(preact.Fragment, {}, vdom.props.children);
        };
    }
    function addPropGetterSetters(proto, properties) {
        if (!properties)
            return;
        for (let name in properties) {
            Object.defineProperty(proto, name, {
                get() {
                    return this.getProperty(name);
                },
                set(value) {
                    this.setProperty(name, value);
                }
            });
        }
    }
    function addMethods(proto, methods) {
        if (!methods)
            return;
        for (let method in methods) {
            proto[method] = function () {
                if (this._helper === valueBasedElement) {
                    throw new ojcustomelementUtils.JetElementError(this, 'Cannot access element methods when rendered as a value based element.');
                }
                const comp = this._helper.ref.current;
                if (!comp) {
                    throw new ojcustomelementUtils.JetElementError(this, 'Cannot access methods before element is upgraded.');
                }
                return comp[method].apply(comp, arguments);
            };
        }
    }
    function isGlobalProperty(prop, metadata) {
        return (prop === 'className' ||
            ojcustomelementUtils.AttributeUtils.isGlobalOrData(prop) ||
            isGlobalEventListenerProperty(prop, metadata));
    }
    const _GLOBAL_EVENT_MATCH_EXP = /^on(?!.*Changed$)([A-Za-z])([A-Za-z]*)$/;
    function isGlobalEventListenerProperty(prop, metadata) {
        var _a, _b;
        if ((_a = metadata === null || metadata === void 0 ? void 0 : metadata.properties) === null || _a === void 0 ? void 0 : _a[prop]) {
            return false;
        }
        const match = prop.match(_GLOBAL_EVENT_MATCH_EXP);
        if (match) {
            const eventType = match[1].toLowerCase() + match[2];
            return !((_b = metadata === null || metadata === void 0 ? void 0 : metadata.events) === null || _b === void 0 ? void 0 : _b[eventType]);
        }
        return false;
    }

    function method(target, propertyKey, descriptor) { }

    (function () {
        if (typeof window !== 'undefined') {
            if (!HTMLTemplateElement.prototype.hasOwnProperty('render')) {
                Object.defineProperty(HTMLTemplateElement.prototype, 'render', {
                    value: null,
                    writable: true
                });
            }
        }
    })();

    const getUniqueId = ojcustomelementUtils.ElementUtils.getUniqueId.bind(null, null);

    exports.Root = Root;
    exports.customElement = customElement;
    exports.getUniqueId = getUniqueId;
    exports.method = method;

    Object.defineProperty(exports, '__esModule', { value: true });

});
