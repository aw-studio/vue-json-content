import { defineComponent, useSlots, ref, onMounted, openBlock, createBlock, unref, withCtx, createElementVNode, resolveDynamicComponent, watch, mergeProps, createCommentVNode } from 'vue';
import Draggable from 'vuedraggable';
import { v4 } from 'uuid';

var script$1 = /*#__PURE__*/ defineComponent({
    props: {
        group: {
            type: String,
            default: 'sections',
        },
    },
    setup(__props) {
        const slots = useSlots();
        const drawers = ref();
        const cloneSection = (el) => ({
            uuid: v4(),
            component: el.props.draws,
        });
        onMounted(() => {
            if (slots.default) {
                drawers.value = slots.default();
            }
        });
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(unref(Draggable), {
                modelValue: drawers.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => ((drawers).value = $event)),
                group: {
                    name: __props.group,
                    pull: 'clone',
                    put: false,
                },
                sort: false,
                clone: cloneSection
            }, {
                item: withCtx(({ element }) => [
                    createElementVNode("div", null, [
                        (openBlock(), createBlock(resolveDynamicComponent(element)))
                    ])
                ]),
                _: 1 /* STABLE */
            }, 8 /* PROPS */, ["modelValue", "group"]));
        };
    }
});

script$1.__file = "src/components/Cabinet.vue";

var script = /*#__PURE__*/ defineComponent({
    props: {
        modelValue: {
            type: Array,
            required: true,
        },
        sections: {
            type: Object,
            required: true,
        },
        group: {
            type: String,
            default: 'sections',
        },
        dragOptions: {
            type: Object,
            default: () => ({
                animation: 200,
                ghostClass: 'ghost',
            }),
        },
    },
    emits: ['update:modelValue'],
    setup(__props, { emit }) {
        const props = __props;
        const drag = ref(false);
        const updateElement = (element, value) => {
            element.value = value;
        };
        const getSectionKey = (section) => {
            const json = JSON.stringify(section);
            for (let key in props.sections) {
                if (JSON.stringify(props.sections[key]) == json) {
                    return key;
                }
            }
            return '';
        };
        const parseValue = (value) => {
            let b = [];
            for (let i in value) {
                b.push({
                    uuid: v4(),
                    key: value[i].type,
                    value: value[i].value,
                    component: props.sections[value[i].type],
                });
            }
            return b;
        };
        const transformValue = (value) => {
            let b = [];
            for (let i in value) {
                b.push({
                    type: getSectionKey(value[i].component),
                    value: value[i].value || {},
                });
            }
            return b;
        };
        const value = ref(parseValue(props.modelValue));
        watch(() => value, () => emit('update:modelValue', transformValue(value.value)), { deep: true });
        return (_ctx, _cache) => {
            return (value.value)
                ? (openBlock(), createBlock(unref(Draggable), mergeProps({
                    key: 0,
                    modelValue: value.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => ((value).value = $event))
                }, __props.dragOptions, {
                    group: __props.group,
                    itemKey: "uuid",
                    tag: "transition-group",
                    "component-data": {
                        name: !drag.value ? 'flip-list' : null,
                        wrap: true,
                    },
                    onStart: _cache[1] || (_cache[1] = ($event) => (drag.value = true)),
                    onEnd: _cache[2] || (_cache[2] = ($event) => (drag.value = false))
                }), {
                    item: withCtx(({ element }) => [
                        createElementVNode("div", null, [
                            (openBlock(), createBlock(resolveDynamicComponent(__props.sections[getSectionKey(element.component)]), {
                                modelValue: element.value,
                                "onUpdate:modelValue": (e) => updateElement(element, e)
                            }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"]))
                        ])
                    ]),
                    _: 1 /* STABLE */
                }, 16 /* FULL_PROPS */, ["modelValue", "group", "component-data"]))
                : createCommentVNode("v-if", true);
        };
    }
});

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n.flip-list-move {\n    transition: transform 0.5s;\n}\n.no-move {\n    transition: transform 0s;\n}\n.ghost {\n    opacity: 0.5;\n    background: #dde0ee;\n    border: none;\n}\n";
n(css,{});

script.__file = "src/components/Sections.vue";

export { script$1 as Cabinet, script as Sections };
